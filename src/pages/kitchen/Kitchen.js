import React from "react";
import firebase from "../../firebase-config";
import "firebase/firebase-auth";
import "firebase/firebase-firestore";
import Button from '../../components/button/button';
const Kitchen = () => {
  return (
    <>
      <h1>COZINHA</h1>
      <Button  name ='Exit'onClick={() => firebase.auth().signOut() }/>
    </> 
  );
};

export default Kitchen;
