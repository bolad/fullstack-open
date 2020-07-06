const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { request } = require('../app')
const { response } = require('express')

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
    return authorization.substring(7)  
  }  
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const token = getTokenFrom(request)  
    const decodedToken = jwt.verify(token, process.env.SECRET)  
    if (!token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }  

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    if (!blog.url || !blog.title) {
      return response
        .status(400)
        .json({ error: "Title or url missing" })
        .end();
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete) {
      response.status(400).json({
        error: "blog was not found"
      })
    }

    const token = getTokenFrom(request)  
    const decodedToken = jwt.verify(token, process.env.SECRET)  
    if (!token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }  

    if (!(blogToDelete.user.toString() === decodedToken.id.toString())) {
      return response.status(401).json({
        error: 'You can only delete your own blog'
      })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error));
  
})

module.exports = blogsRouter