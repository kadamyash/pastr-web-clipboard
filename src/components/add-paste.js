import React, { useState } from 'react';
import { Jumbotron, Form, Button, Col, Row, Modal, Toast } from 'react-bootstrap';
import { useHistory } from 'react-router';
import firebase from 'firebase/app'
import '../App.css'
import Login from './signin';
import { Link } from 'react-router-dom';

function AddPaste(props) {

    return (
        <div className="main">
        <Jumbotron id={props.user.currentUser?"signed-main":"unsigned-main"}>
            {
            props.user.currentUser?<PasteBuilder user = {props.user.currentUser} store = {props.store}/>:
            <UserNotSignedIn user = {props.user}/>
            }
        </Jumbotron>
        </div>
    );
}

const UserNotSignedIn = (props) => {
    return(
        <div>
            <h3>Error : User Not Signed In</h3>
            <br></br>
            <Login user={props.user}/>
        </div>
    );
}

const PasteBuilder = (props) => {
    const firestore = props.store;
    const pastebox = firestore.collection('pastebox');  

    const [title, setTitle] = useState(null);
    const [paste, setPaste] = useState(null);
    const user = props.user;
    

    const saveQuiz = async(e) => {
        e.preventDefault();
        console.log(title, paste, user.uid);
        if(title===''||title===null||paste===''||paste===null){
            alert("Can't Save Empty Paste");
        }
        else{
            await pastebox.add({
                'title': title,
                'type': 'unlisted',
                'topic': 'unclassified',
                'paste': paste,
                'userName': user.displayName,
                'userId': user.uid,
                'userEmail': user.email,
                'likes': 0,
                'createdAt': firebase.firestore.FieldValue.serverTimestamp(),
                'reports': 0
            });
        }
        handleCloseA();
        toggleShowB();
        
    }
    const res = window.innerWidth;  
    const isMobile = res >=320 && res<800;
    let history = useHistory();

    function handleBack() {
        handleClose();
        history.push("/");
    }

    function confirmClose(){
        if(title!==null||paste!==null){
            handleShow();
        }
        else{
            handleBack();
        }
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [showA, setShowA] = useState(false);
    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);

    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);

    return(
        <Form id="form">
            <Row>
                <Col xs={10}><h3>Add a paste</h3></Col>
                <Col xs={2}>{isMobile?<p className="links-phone" onClick={()=>confirmClose()}>Back</p>:null}</Col>
            </Row>
            <br></br>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title of your paste</Form.Label>
                <Form.Control className="font-mono" type="text" placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                <Form.Text className="text-muted">
                Feel free to use alphabets and/or numbers.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPaste">
                <Form.Label>Type in your thoughts...</Form.Label>
                <Form.Control className="font-mono" as="textarea" rows={5} onChange={(e)=>setPaste(e.target.value)}/> 
            </Form.Group>
            {isMobile?
                <span className="mobile-btn-cluster">
                    <Button variant="warning" type="reset" >
                        Clear
                    </Button>
                    <Button id="save-btn" variant="success" type="button" >
                        Save
                    </Button>
                    <br></br>
                </span>:
                <Row className="input-row">
                    <Col sm={10}>
                        <Button id="pri-btn" variant="primary" type="button" onClick={()=>confirmClose()} >
                            Back
                        </Button>
                    </Col>
                    <Col sm={1}>
                        <Button id="ez-btn" variant="warning" type="reset">
                            Clear
                        </Button>
                    </Col>
                    <Col sm={1}>
                        <Button id="save-btn" variant="success" type="button" onClick={handleShowA} >
                            Save
                        </Button>
                    </Col>
                </Row>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Unsaved Changes!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to leave the progress unsaved? All typed content will be lost. Continue?</Modal.Body>
                <Modal.Footer>
                <Button id="delete-btn" variant="dark" onClick={handleBack}>
                    Yes, proceed to home    
                </Button>
                <Button id="pri-btn" variant="secondary" onClick={handleClose}>
                    No, go back!
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showA} onHide={handleCloseA}>
                <Modal.Header closeButton>
                <Modal.Title>Save Note?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You want to save this note with the title {title}?</Modal.Body>
                <Modal.Footer>
                <Button id="save-btn" variant="dark" onClick={(e)=>saveQuiz(e)}>
                    Yes, Save 
                </Button>
                <Button id="pri-btn" variant="secondary" onClick={handleCloseA}>
                    No, go back!
                </Button>
                </Modal.Footer>
            </Modal>
            <br></br>
            <Row>
                <Col>
                    <Toast onClose={toggleShowB} show={showB} animation={false}>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Your Paste Was Saved</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body><Link to="/my-pastes">Checkout your pastes now?</Link></Toast.Body>
                    </Toast>
                </Col>
            </Row>
            
        </Form>
    );
}

export default AddPaste;