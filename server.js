const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const PORT = '8080';
const Article = require('./models/article');
const Comment = require('./models/comment');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

if(process.env === 'MONGODB_URI') {
  mongoose.connect("mongodb://heroku_6nrd6j21:s3ld8tobei3cov14a14qc9tk7j@ds025459.mlab.com:25459/heroku_6nrd6j21", { useNewUrlParser: true });
} else {
  mongoose.connect("mongodb://localhost/newsboard", { useNewUrlParser: true });
}

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/scrape/:topic', (req, res) => {
  scrapeData(req, res, req.params.topic);
});

app.post('/save', (req, res) => {
   //insert document
  Article.create(req.body)
    .then(dbArticle => res.send(dbArticle))
    .catch(err => { return res.json(err) });
});

app.get('/clear', (req, res) => {
  Article.deleteMany({}).then(dbArticles => {
    res.end(dbArticles);
  }).catch(err => {
    console.log(err);
  })
});

app.get('/articles/saved', (req, res) => {
  Article.find({})
    .populate('comments')
    .then(dbArticles => {
      res.json(dbArticles);
    }).catch(err => {
      console.log(err);
    })
});

app.post('/articles/comments/', (req, res) => {
  Comment.create(req.body).then(dbComment => {
    return Article.findOneAndUpdate({}, { 
      $push: { comments: dbComment._id }
    }, { new: true } )
  }).then(dbArticle => {
    res.json(dbArticle);
  })
  .catch(err => {
    res.json(err);
  });
});

app.delete('/articles/saved/:id', (req, res) => {
  Article.deleteOne({ _id: req.params.id })
    .then(dbArticle => res.send(dbArticle))
    .catch(err => { return res.json(err) });
});

app.listen(PORT, () => console.log("server is running..."));

function scrapeData(req, res, topic) {
  axios.get(`https://www.nytimes.com/section/${topic}`).then(response => {
    const $ = cheerio.load(response.data);
    const articles = []
    $('div.story-body').each(function(i, element) {
        const title = $(element).children('h2.headline').text().trim();
        const summary = $(element).children('p.summary').text().trim();
        const author = $(element).children('p.byline').text().trim();
        const img = $(element).siblings('.media').find('img').attr('src');
        const link = $(element).parent().attr('href');
       
        if(title && summary) {
          articles.push({ title, summary, author, img, link });
        }
    });
    res.json(articles);
  });
}