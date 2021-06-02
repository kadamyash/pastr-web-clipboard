import React, { useState } from 'react';
import { Card, Button, Toast } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom';
import '../App.css'

function MyPastes(props) {
    const firestore = props.store;
    const pastes = firestore.collection('pastebox');
    const query = pastes.where('userId', '==', props.user.currentUser.uid);
    const [myPastes] = useCollectionData(query, {idField: 'id'});


    function copyLinkToBoard() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      
        /* Alert the copied text */
        
      }

      const deleteDocument = async(e, docId, docName) =>{
        setDeletedPaste(docName);
        setShowA(true);
        await firestore.collection('pastebox').doc(docId).delete();
      }

      const [deletedPaste, setDeletedPaste] = useState(null);

      const [showA, setShowA] = useState(false);
    
      const toggleShowA = () => setShowA(!showA);

    return (
        <div className="main">
            <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>Just Now</small>
                    </Toast.Header>
                    <Toast.Body>Deleted paste with title : {deletedPaste} </Toast.Body>
                </Toast>
            {myPastes?
            <div id={props.user.currentUser?"signed-main":"unsigned-main"}>
            {myPastes.map(paste => (
                <div>
                <Card style={{width: '100%', margin: '1em, 0'}}>
                <Card.Header as="h5">{paste.title}</Card.Header>
                <Card.Body> 
                    <Card.Text style={{fontSize: '0.5em', opacity: '0.5'}}>
                    Unlisted Paste
                    </Card.Text>
                    <div >
                        <input type="text" value={"https://pastr-web.vercel.app/paste/"+paste.id} id="myInput"/>
                        <Button onClick={()=>copyLinkToBoard()} variant="light" size="sm">📋 Copy Link</Button>
                    </div>
                    <br/>
                    <Link to={"/paste/"+paste.id}><Button variant="primary" id="pri-btn">View Paste</Button></Link>
                    <Button onClick={(e)=>deleteDocument(e, paste.id, paste.title)} variant="dark" id="delete-btn">Delete</Button>
                </Card.Body>
                </Card>
                </div>
                
            ))}
            
            </div>
            :
            <h3>Fetching.....</h3>
            }
        </div>
    );
}

export default MyPastes;
