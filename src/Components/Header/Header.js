import React from 'react';
import { Navbar } from 'react-bootstrap';


function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand>Flight-Tracker</Navbar.Brand> 
    </Navbar>
  );
}

export default Header;