import React, { Component } from 'react';
import { store } from '../store';  
import { setTechnology } from '../actions';
import Navbar from './Navbar';
import Articles from './Articles';

export default class NewsBoard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Navbar />
        <Articles />
        <h1>{store.getState().tech}</h1>
        <input id="tech"/>
        <button onClick={dispatchBtnAction}>Update</button>
      </div>
    )
  }
}

function dispatchBtnAction(e) {
  const input = document.getElementById("tech").value;
  e.preventDefault(e)
  store.dispatch(setTechnology(input));
}