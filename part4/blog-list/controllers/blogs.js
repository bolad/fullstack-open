const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
  })

module.exports = blogsRouter