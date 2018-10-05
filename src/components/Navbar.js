import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize';

export default (props) => {
  return (
    <Navbar brand='NewsBoard' right>
      <NavItem href='get-started.html'><Icon>search</Icon></NavItem>
      <NavItem href='get-started.html'><Icon>view_module</Icon></NavItem>
      <NavItem href='get-started.html'><Icon>refresh</Icon></NavItem>
      <NavItem href='get-started.html'><Icon>more_vert</Icon></NavItem>
    </Navbar>
  ) 
}