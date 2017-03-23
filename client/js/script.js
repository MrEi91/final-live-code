$(document).ready(function() {
  let token = localStorage.getItem('token')
  if (!token) {
    window.location.href = 'http://127.0.0.1:8080/index.html'
  } else {
    $.ajax({
      url: `http://localhost:3000/api/verify/${token}`,
      success: function(user) {
        if (!user.email) {
          window.location.href = 'http://127.0.0:8080/api/index.html'
        }
      }
    })
    getArticles()
  }
})

$('#logout').click(function() {
  localStorage.clear()
  window.location.href = 'http://127.0.0.1:8080/index.html'
})

function getArticles() {
  $.ajax({
    url: 'http://localhost:3000/api/articles',
    type: 'GET',
    success: function(articles) {
      articles.article.forEach(function(article) {
        $('#article').append(`<td>${article.title}</td><td>${article.content}</td><td>${article.author}</td><td><a type="button" href ="#editArticle" class="waves-effect waves-light btn" onclick="getOneArticle('${article.slug}')">edit</a><a type="button"class="waves-effect waves-light btn" onclick="remove('${article.slug}')">delete</a></td>`)
      })
    }
  })
}

function getOneArticle(slug) {
  $.ajax({
    url: `http://localhost:3000/api/article/${slug}`,
    type: 'GET',
    success: function(article) {
      $('#editTitle').val(article.title)
      $('#editContent').val(article.content)
      $('#btn-edit').attr('onclick', `editArticle('${slug}')`)
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function createArticle() {
  $.ajax({
    url: 'http://localhost:3000/api/article',
    type: 'POST',
    data: {
      title: $('#title').val(),
      content: $('#content').val(),
      author: $('#author').val()
    },
    success: function(article) {
      $('#article').append(`<td>${article.title}</td><td>${article.content}</td><td>${article.author}</td><td><a type="button" href ="#editArticle" class="waves-effect waves-light btn" onclick="getOneArticle('${article.slug}')">edit</a><a type="button"class="waves-effect waves-light btn" onclick="remove('${article.slug}')">delete</a></td>`)
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function editArticle(slug) {
  console.log(slug)
  $.ajax({
    url: `http://localhost:3000/api/article/${slug}`,
    type: 'PUT',
    data: {
      title: $('#editTitle').val(),
      content: $('#editContent').val()
    },
    success: function(article) {
      $('#article').html('')
      getArticles()
    },
    error: function(err) {
      console.log(err)
    }
  })
}

function remove(slug) {
  $.ajax({
    url: `http://localhost:3000/api/article/${slug}`,
    type: 'DELETE',
    success: function(user) {
      $(`#article`).remove()
    }
  })
}
