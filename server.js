const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const PORT = '8080';
const Article = require('./models/article');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

mongoose.connect("mongodb://localhost/newsboard", { useNewUrlParser: true });

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/scrape/:topic', (req, res) => {
  scrapeData(req, res, req.params.topic);
});

app.post('/save', (req, res) => {
   //insert document
  Article.create(req.body)
    .then(dbArticle => console.log(dbArticle))
    .catch(err => { return res.json(err) });
});

app.get('/clear', (req, res) => {
  Article.deleteMany({}).then(dbArticles => {
    res.end(dbArticles);
  }).catch(err => {
    console.log(err);
  })
});

app.listen(PORT, () => console.log("server is running..."));

function scrapeData(req, res, topic) {
  axios.get(`https://www.nytimes.com/section/${topic}`).then(response => {
    const $ = cheerio.load(response.data);
    const articles = []
    $('div.story-body').each(function(i, element) {
        const title = $(element).children('h2.headline').text();
        const summary = $(element).children('p.summary').text();
        const author = $(element).children('p.byline').text();
        const img = $(element).siblings('.media').find('img').attr('src');
        const link = $(element).parent().attr('href');
       
        if(title && summary) {
          articles.push({ title, summary, author, img, link });
        }
    });
    res.json(articles);
  });
}