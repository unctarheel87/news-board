const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "title is required"
  },
  summary: {
    type: String,
    trim: true,
    required: "summary is Required"
  },
  img: {
    type: String,
    trim: true,
    required: "image is Required"
  },  
  link: {
    type: String,
    trim: true,
    required: "link is Required"
  },
});

module.exports = mongoose.model('Article', articleSchema);