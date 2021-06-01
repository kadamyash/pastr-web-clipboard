import { Button } from 'react-bootstrap';
import firebase from 'firebase/app'
import '../App.css'
import React from 'react';


function Login(props) {

    const signInWithGoogle = () => {
        console.log(props.user);
        const provider = new firebase.auth.GoogleAuthProvider();
        props.user.signInWithPopup(provider);
    }

    return (
        <div className="loginPage">
            <Button className="login-btn" onClick={signInWithGoogle}>Sign In</Button>
        </div>
    );
}

export default Login;