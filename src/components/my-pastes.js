import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link } from 'react-router-dom';

function MyPastes(props) {
    const firestore = props.store;
    const pastes = firestore.collection('pastebox');
    const query = pastes.where('userId', '==', props.user.currentUser.uid);
    const [myPastes] = useCollectionData(query, {idField: 'id'});

    return (
        <div className="main">
            {myPastes?
            <div id={props.user.currentUser?"signed-main":"unsigned-main"}>
            {myPastes.map(paste => (
                <Card style={{width: '100%', margin: '1em, 0'}}>
                <Card.Header as="h5">{paste.title}</Card.Header>
                <Card.Body> 
                    <Card.Text style={{fontSize: '0.5em', opacity: '0.5'}}>
                    Unlisted Paste
                    </Card.Text>
                    <Link to={"/paste/"+paste.id}><Button variant="primary">View Paste</Button></Link>
                </Card.Body>
                </Card>
                
            ))}
            </div>
            :
            <h3>Fetching.....</h3>
            }
        </div>
    );
}

export default MyPastes;
