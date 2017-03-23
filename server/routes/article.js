'ues strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/articleController')

router.get('/articles', controller.getArticles)
router.post('/article', controller.createArticle)
router.put('/article/:slug', controller.updateArticle)
router.delete('/article/:slug', controller.deleteArticle)

module.exports = router
