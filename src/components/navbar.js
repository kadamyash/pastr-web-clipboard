import React from 'react'
import '../App.css'
import {Navbar, Nav, Button} from 'react-bootstrap'

export default function NavigationBar() {
    return (
        <Navbar id="boot-nav" variant="dark">
            <Navbar.Brand href="/">PASTR</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#signin"><Button>SignIn</Button></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
