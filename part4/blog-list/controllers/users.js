const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {

  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (!body.password || body.password.length < 3) {
      return response.status(400).json({
        error: 'password must have at least 3 characters'
      })
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  /* The parameter given to the populate method defines that the ids 
  referencing blog objects in the blogs field of the user document 
  will be replaced by the referenced blog documents. */
  const users = await User.find({}).populate('blogs', { title: 1, date: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter