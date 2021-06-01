import React from 'react'
import '../App.css'
import {Navbar, Nav } from 'react-bootstrap'
import Login from './signin'
import Signout from './signout'

export default function NavigationBar(props) {
    console.log(props.user);
    return (
        <Navbar id="boot-nav" variant="dark">
            <Navbar.Brand href="/">PASTR</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                {props.user?<Nav.Link href="#signout"><Signout user={props.auth}/></Nav.Link>:<Nav.Link href="#signin"><Login user={props.auth}/></Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
