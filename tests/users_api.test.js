/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('creation of a new user', () => {
  test('fails if username is missing', async () => {
    const newUser = {
      name: 'No Username',
      password: 'validpass'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username and password are required')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(1)
  })

  test('fails if password is missing', async () => {
    const newUser = {
      username: 'newuser',
      name: 'No Password'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username and password are required')
  })

  test('fails if username is shorter than 3 characters', async () => {
    const newUser = {
      username: 'ab',
      name: 'Short User',
      password: 'validpass'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('must be at least 3 characters long')
  })

  test('fails if password is shorter than 3 characters', async () => {
    const newUser = {
      username: 'validname',
      name: 'Short Password',
      password: 'pw'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('must be at least 3 characters long')
  })

  test('fails if username is already taken', async () => {
    const newUser = {
      username: 'root',
      name: 'Duplicate User',
      password: 'validpass'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('username must be unique')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
