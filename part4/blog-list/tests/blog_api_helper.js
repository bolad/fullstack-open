const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Redux Saga rocks",
    author: "Stanley Bolad",
    url: "https://bolad.com/",
    likes: 10
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'will remove this soon',
    author: "Monika Akyea",
    url: "https://bolad.com/",
    likes: 12
   })
  await blog.save()
  await blog.remove()

  return blod._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}