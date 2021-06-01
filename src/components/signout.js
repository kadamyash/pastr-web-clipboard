import React from 'react';
import { Button } from 'react-bootstrap';
import '../App.css'

function Signout(props) {
    return props.user.currentUser && (
        <Button id="signout" className="logout-btn" onClick={()=>props.user.signOut()}>Signout</Button>
    );
}

export default Signout;