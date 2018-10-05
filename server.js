const cheerio = require('cheerio');
const axios = require('axios');


axios.get('https://www.nytimes.com/section/science').then(function(response) {
  const $ = cheerio.load(response.data);
  const results = [];

  $('article.story .story-meta').each(function(i, element) {
    const title = $(element).children('h2.headline').text().trim();
    const summary = $(element).children('p.summary').text().trim();
    const author = $(element).children('p.byline').text().trim();
    const img = $(element).siblings('div.wide-thumb').children().attr('src');
    const link = $(element).parent().attr('href');

    results.push({ title, summary, author, img, link });
  });

  console.log(results);
});