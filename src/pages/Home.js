import React from "react";
import app from "../base";

const Home = () => {
  return (
    <>
      <h1>Burger Queen</h1>
      <button onClick={() => app.auth().signOut()}>Exit</button>
    </>
  );
};

export default Home;
