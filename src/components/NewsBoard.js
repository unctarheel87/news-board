import React, { Component } from 'react';
import { store } from '../store';  
import { setTechnology } from '../actions';

export default class NewsBoard extends Component {
  render() {
    return (
      <div>
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