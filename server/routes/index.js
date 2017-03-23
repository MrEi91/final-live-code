'ues strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')

router.get('/index', function (req, res) {
  res.send('SUCCSESS')
})

router.get('/users', controller.getUsers)
router.post('/user', controller.createUser)

router.post('/user/login', controller.login)
router.get('/verify/:token', controller.verifyToken)

module.exports = router
