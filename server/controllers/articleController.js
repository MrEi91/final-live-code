'use strict'

const article = require('../models/article')
const user = require('../models/user')
const slug = require('slug')

let Article = {}

Article.getArticles = (req, res, next) => {
  article.find()
    .populate({
      path: 'User',
      model: 'User'
    })
    .then((articles) => {
      res.send({
        article: articles
      })
    })
    .catch((error) => {
      res.send({
        error: error
      })
    })
}

Article.createArticle = (req, res, next) => {
  article.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.userID,
    slug: slug(req.body.slug).toLowerCase()
  })
    .then((article) => {
      user.findOne({
        _id: req.body.userID
      })
        .then(function (user) {
          user.articles.push(article._id)
          user.save()
            .then(function (result) {
              console.log(result)
            })
        })
        .catch(function (err) {
          res.send(err)
        })
      res.send({
        message: 'SUCCSESS CREATE ARTICLE!',
        article: article
      })
    })
    .catch((error) => {
      res.send({
        error: error.message
      })
    })
}

Article.updateArticle = (req, res, next) => {
  article.findOne({
    slug: req.params.slug
  })
    .then((article) => {
      if (!article) {
        res.send({
          articleUndefined: 'Article is not found!'
        })
      } else {
        article.update({
          title: req.body.title,
          content: req.body.content,
          slug: slug(req.body.title).toLowerCase()
        })
          .then(() => {
            res.send({
              message: `Article title ${article.title} has been updated!`,
              article: article
            })
          })
          .catch((error) => {
            res.send({
              message: 'Article failed to update!',
              error: error
            })
          })
      }
    }).catch((error) => {
      res.send({
        message: 'Error find one',
        error: error
      })
    })
}

Article.deleteArticle = (req, res, next) => {
  article.findOne({
    slug: req.params.slug
  })
    .then((article) => {
      if (!article) {
        res.send({
          articleUndefined: 'Article is not found!'
        })
      } else {
        article.remove(article)
          .then((article) => {
            res.send({
              message: `${article.title} has been deleted`
            })
          })
          .catch((error) => {
            res.send({
              message: 'Memo failed to delete!',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.send({
        message: 'Error find one',
        error: error
      })
    })
}

module.exports = Article
