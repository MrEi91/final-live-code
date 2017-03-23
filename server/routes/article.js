'ues strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/articleController')

router.get('/index', function(req, res) {
  res.send('SUCCSESS')
})

router.get('/articles', controller.getArticles)
router.post('/article', controller.createArticle)

module.exports = router
