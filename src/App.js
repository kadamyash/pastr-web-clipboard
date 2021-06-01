import NavigationBar from './components/navbar';
import './App.css';
import Main from './components/main';
import AddPaste from './components/add-paste';
import Error from './components/error';

import {Switch, Route } from 'react-router-dom'

import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app' 

var firebaseConfig = {
  apiKey: "AIzaSyCr9dpueAisQXJFqx8R0GfuyouMkjtNsaI",
    authDomain: "noteback-react.firebaseapp.com",
    databaseURL: "https://noteback-react-default-rtdb.firebaseio.com",
    projectId: "noteback-react",
    storageBucket: "noteback-react.appspot.com",
    messagingSenderId: "536228499712",
    appId: "1:536228499712:web:59908afe5b84c7d6e0a3e5"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  console.log(auth, firestore, user);
  return (
    <div className="App">
      <NavigationBar user={user} auth={auth}></NavigationBar>
      <Switch>
        <Route path="/" exact><Main store={firestore} user={auth}></Main></Route>
        <Route path="/add-paste" exact><AddPaste store={firestore} user={auth}></AddPaste></Route>
        <Route path="/unknown-error" exact><Error store={firestore} user={auth}></Error></Route>
      </Switch>
    </div>
  );
}

export default App;
