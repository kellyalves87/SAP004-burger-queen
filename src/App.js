import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Hall from "../src/pages/hall/Hall";
import Kitchen from "../src/pages/kitchen/Kitchen";
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signup/SignUp";
import firebase from "./firebase-config";

const App = () => {
  const [loggedUser, setLoggedUser] = useState();

  const getUser = (user) => {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        doc.data().workPlace === "kitchen"
          ? defineRoute("/kitchen", Kitchen)
          : defineRoute("/hall", Hall);
      });
  };

  const defineRoute = (route, component, route2 = false) => {
    setLoggedUser(() => (
      <BrowserRouter>
        <Redirect to={route} />
        <Switch>
          <Route path={route} component={component} />
          {route2 && <Route exact path='/signup' component={SignUp} />}
        </Switch>
      </BrowserRouter>
    ));
  };
    
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? getUser(user) : defineRoute("/login", Login, true);
    });
  }, []); //eslint-disable-line

  return <>{loggedUser}</>;
};

export default App;
