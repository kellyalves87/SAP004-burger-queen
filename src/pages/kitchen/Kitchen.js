import React from "react";
import app from "../../firebase-config";

const Kitchen = () => {
  return (
    <>
      <h1>Burger Queen</h1>
      <button onClick={() => app.auth().signOut()}>Exit</button>
    </>
  );
};

export default Kitchen;
