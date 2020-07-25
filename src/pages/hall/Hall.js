import React from "react";
import firebase from "../../firebase-config";
import { Link } from "react-router-dom";
import Button from "../../components/button/button";

const Hall = () => {
  return (
    <>
      <h1>Hall</h1>
      <Link to='/login'>
        <Button name='Exit' onClick={() => firebase.auth().signOut()} />
      </Link>
    </>
  );
};

export default Hall;
