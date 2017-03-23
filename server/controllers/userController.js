'use strict'

const user = require('../models/user')
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
const secret = 'mrei91'

let User = {}

User.getUsers = (req, res, next) => {
  user.find()
    .populate('articles')
    .then((users) => {
      res.send(users)
    })
    .catch((error) => {
      res.send({
        message: error
      })
    })
}

User.createUser = (req, res, next) => {
  user.findOne({
      email: req.body.email
    })
    .then((email) => {
      if (email) {
        res.send({
          userAlready: true
        })
      } else {
        user.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
          })
          .then((user) => {
            res.send({
              message: 'SUCCSESS',
              user: user
            })
          })
          .catch((error) => {
            res.send({
              message: 'REGISTER NOT SUCCSESS',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.send({
        message: 'Format email is wrong!',
        error: error
      })
    })
}

User.login = (req, res, next) => {
  user.findOne({
      username: req.body.username
    })
    .then((user) => {
      if (!user) {
        res.send({
          userUndefined: true
        })
      } else {
        if (passwordHash.verify(req.body.password, user.password)) {
          let token = jwt.sign({
            email: req.body.username
          }, secret, {})

          res.send({
            token: token
          })
        } else {
          res.send({
            wrongPassword: true
          })
        }
      }
    })
    .catch((error) => {
      res.send({
        error: error
      })
    })
}

User.verifyToken = (req, res) => {
  let token = req.params.token
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      res.send({
        message: error
      })
    }

    if (!decoded) {
      res.send({
        email: false
      })
    } else {
      res.send({
        email: true
      })
    }
  })
}

module.exports = User
