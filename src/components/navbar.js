import React from 'react'
import '../App.css'
import {Navbar, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Login from './signin'
import Signout from './signout'

export default function NavigationBar(props) {
    console.log(props.user);
    return (
        <Navbar id="boot-nav" variant="dark">
            <Navbar.Brand href="/" className="font-fancy">PASTR</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                {!props.user?<Nav.Link href="/">Home</Nav.Link>:null}
                {props.user?<Nav.Link ><Link to="/add-paste" style={{color: "inherit"}}>Write</Link></Nav.Link>:null}
                {props.user?<Nav.Link ><Link to="/my-pastes" style={{color: "inherit"}}>My Pastes</Link></Nav.Link>:null}
                {props.user?<Nav.Link href="#signout"><Signout user={props.auth}/></Nav.Link>:<Nav.Link href="#signin"><Login user={props.auth}/></Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
