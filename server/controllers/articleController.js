'use strict'

const article = require('../models/article')

let Article = {}

Article.getArticles = (req, res, next) => {
  article.find()
    .then((articles) => {
      res.send(articles)
    })
    .catch((error) => {
      res.send({
        message: error
      })
    })
}

Article.createArticle = (req, res, next) => {
  article.create(req.body)
    .then((article) => {
      res.send({
        message: 'SUCCSESS',
        article: article
      })
    })
    .catch((error) => {
      res.send({
        message: 'Format email is wrong!',
        error: error
      })
    })
}

module.exports = User
