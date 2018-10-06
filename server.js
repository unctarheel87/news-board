const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');
const PORT = '8080';
const Article = require('./models/article');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/articles/all', (req, res) => {
  scrapeData(req, res)
});

app.listen(PORT, () => console.log("server is running..."));

function scrapeData(req, res) {
  axios.get('https://www.nytimes.com/section/science').then(response => {
    const $ = cheerio.load(response.data);
    Article.remove({}).then(() => {}).catch(err => console.log(err));
    $('article.story .story-meta').each(function(i, element) {
        const title = $(element).children('h2.headline').text().trim();
        const summary = $(element).children('p.summary').text().trim();
        const author = $(element).children('p.byline').text().trim();
        const img = $(element).siblings('div.wide-thumb').children().attr('src');
        const link = $(element).parent().attr('href');
        //insert document
        Article.insert({ title, summary, author, img, link }, (err, response) => {
          if (err) console.log(err);
          //console.log(response);
        });
      });
      Article.find({}, (err, response) => {
        if (err) console.log(err);
        res.json(response);
      });
    });
  });
}