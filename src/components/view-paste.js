import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {Col, Jumbotron, Row, Spinner} from 'react-bootstrap'

function ViewPaste(props) {

    let history = useHistory();

    function handleURLNotFound() {
        history.push("/error");
    }

    const [pasteData, setPasteData] = useState(null);

    var url = window.location.href;
    const pattern = url.match(/p\/(.*)/);
    let searchParam
    if(pattern!==null){
        searchParam = pattern[1]
    }
    else{
        handleURLNotFound();
    }
    const firestore = props.store;
    const paste = firestore.collection('pastebox').doc(searchParam);
    paste.get().then(function(doc) {
        if (doc.exists) {
            setPasteData(doc.data());
        } else {
            console.log("Error with database : No such pastr document found!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return (
        <div className="main">
            {pasteData?
            <Jumbotron class="align-left" id={props.user.currentUser?"signed-main":"unsigned-main"}>
                <Row>
                    <Col>
                        <p className="heading">{pasteData.title}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="font-mono content">{pasteData.paste}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>Writer : {pasteData.userName}</Col>
                </Row>
            </Jumbotron>:
            <div>
                <div style={{display: 'flex', flexDirection: 'row', margin: '1em auto', alignItems: 'center', justifyContent: 'center'}}>
                    <h3>Fetching data</h3>
                    <Spinner animation="grow" variant="primary" />
                </div>
                <span>TRY RELOADING/RESTARTING THE WEBSITE/APP IF IT DOESN'T LOAD IN A WHILE</span>
            </div>
            }
        </div>
    );
}

export default ViewPaste;