const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authRouter = require('express').Router()
const { createUser, getUserByUsername } = require('../db/helpers/users')
const { JWT_SECRET, COOKIE_SECRET } = require('../secrets')
const SALT_ROUNDS = 10

authRouter.get('/', async (req, res, next) => {
  try {
      console.log('HEY! I am in your terminal!')
      res.send('WOW! A thing in your response!')
  } catch (error) {
      next(error)
  }
})

authRouter.post('/register', async (req, res, next) => {
  try {
    console.log(req.body)
    const { username, password } = req.body
    console.log(typeof password)
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    console.log(hashedPassword)
    const user = await createUser({ username, password: hashedPassword })
    console.log(user)
    delete user.password

    const token = jwt.sign(user, JWT_SECRET)

    res.cookie('token', token, {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    })

    delete user.password

    res.send({ user })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log({ username, password })
    const user = await getUserByUsername(username)
    console.log(user)
    const validPassword = await bcrypt.compare(password, user.password)

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET)

      res.cookie('token', token, {
        sameSite: 'strict',
        httpOnly: true,
        signed: true,
      })

      delete user.password

      res.send({ user })
    }
  } catch (error) {
    next(error)
  }
})

authRouter.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('token', {
      sameSite: 'strict',
      httpOnly: true,
      signed: true,
    })
    res.send({
      loggedIn: false,
      message: 'Logged Out',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = authRouter
