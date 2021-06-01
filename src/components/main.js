import React, {useState} from 'react';
import { Jumbotron, Button, Modal } from 'react-bootstrap';
import '../App.css'
import Login from './signin';
import { useHistory } from "react-router-dom";

function Main(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function addPaste(){
        if(props.user.currentUser){
            handleAddPaste("Wait");
        }
        else{
            handleShow();
        }
    }

    
    let history = useHistory();

    function handleAddPaste() {
        history.push("/add-paste");
    }

    return (
        <div className="main">
            <Jumbotron id={props.user.currentUser?"signed-main":"unsigned-main"}>
                <h1 className="h-text">Welcome aboard{props.user.currentUser?', '+props.user.currentUser.displayName:null}</h1>
                <p className="intro-text">
                    <strong className="font-fancy">PASTR</strong> is an online clipboard where in you can type/paste your thoughts, ideas, scripts or almost any raw text you wish to show to the world with one link. 
                    This is a beta project and you need a Google Account to write in, save and share pasteboards. Have fun!
                </p>
                <p>
                    <Button id="pri-btn" variant="dark" onClick={()=>addPaste()}>Start PASTING</Button>
                </p>
            </Jumbotron>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sign In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to sign in to write. Kindly sign in.</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Login user={props.user} onClick={handleClose}></Login>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Main;