const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_api_helper')
const app = require('../app') 
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const { TestScheduler } = require('jest')
const { initialBlogs } = require('./blog_api_helper')

let token;

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)

    const user = new User({
      username: 'bolad',
      passwordHash
    })

    await user.save()

    const response = await api
    .post('/api/login')
    .send({
      username: 'bolad',
      password: 'password'
    })
    
    token = response.body.token
  
})

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs must have unique identifier id', async () => {
  const response = await api.get('/api/blogs')
  expect (response.body[0].id).toBeDefined()
})

describe('the addition of a new blog', () => {
  test('passes with an authorization token', async () => {

    const newBlog = {
      title: 'Black Lives Matter',
      author: 'Michael Che',
      url: 'www.che-world.com',
      likes: 123
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('successfully increases the blog list by 1 when blog is valid', async () => {
    const newBlog = {
      title: 'Black Lives Matter',
      author: 'Michael Che',
      url: 'www.che-world.com',
      likes: 123
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain(
        'Black Lives Matter'
      )
  })

  test('will default to the value likes to 0 if missing', async () => {
    const newBlog = {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      url: 'www.chinua-achebe.com',
    }

    const request = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(request.body.likes).toBe(0)
  })

  test('is unsuccessful when url and title are missing', async () => {
    const newBlog = {
      author: 'George Owell',
      likes: 35
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('the deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'React patterns',
      author: 'Michael Chan Lee',
      url: 'https://reactpatterns.com/',
      likes: 15
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
