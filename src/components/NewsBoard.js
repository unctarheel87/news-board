import React, { Component } from 'react';
import axios from 'axios';
import { store } from '../store';  
import { getArticles } from '../actions';
import Navbar from './Navbar';
import Articles from './Articles';

export default class NewsBoard extends Component {
  componentDidMount() {
    getData();
  }
  render() {
    return (
      <div>
        <Navbar />
        {
          store.getState().articles.length > 0 &&
          <Articles store={store.getState().articles} />
        }
      </div>
    )
  }
}

function getData() {
  axios.get('/articles/all').then(response => {
    console.log(response);
    store.dispatch(getArticles(response.data));
    console.log(store.getState());
  }).catch(err => console.log(err));
}