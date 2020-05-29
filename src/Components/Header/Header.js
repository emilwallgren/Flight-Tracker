import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


function Header() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="#home">Flight-Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Map</Nav.Link>
            <Nav.Link href="#link">Airplane-Info</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;