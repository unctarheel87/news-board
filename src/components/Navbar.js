import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { store } from '../store';
import { clearArticles } from '../actions';

export default (props) => {
  return (
    <Navbar brand='NewsBoard' right>
      <NavItem onClick={clear}><Icon>clear_all</Icon><span>Clear Articles</span></NavItem>
    </Navbar>
  ) 
}

function clear() {
  store.dispatch(clearArticles())
}