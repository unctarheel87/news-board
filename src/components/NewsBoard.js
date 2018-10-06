import React, { Component } from 'react';
import axios from 'axios';
import { store } from '../store';  
import { getArticles, clearArticles } from '../actions';
import Navbar from './Navbar';
import Articles from './Articles';

export default class NewsBoard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <button onClick={scrape}>Scrape</button>
        <button onClick={clear}>Clear</button>
        <button data-topic='science' onClick={scrape}>Science</button>
        <button data-topic='politics' onClick={scrape}>Politics</button>
        {
          store.getState().articles &&
          <Articles store={store.getState().articles} />
        }
      </div>
    )
  }
}

function scrape(e) {
  axios.get(`/scrape/${e.target.dataset.topic}`)
  .then(response => {
    clear();
    store.dispatch(getArticles(response.data))
    console.log(store.getState())
  })
  .catch(err => console.log(err));
}

function clear() {
  store.dispatch(clearArticles())
}