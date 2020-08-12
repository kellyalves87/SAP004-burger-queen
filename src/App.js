import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Hall from '../src/pages/hall/Hall';
import Kitchen from '../src/pages/kitchen/Kitchen';
import Login from '../src/pages/login/Login';
import SignUp from '../src/pages/signup/SignUp';
import firebase from './firebase-config';

const App = () => {
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.data().workPlace === 'kitchen') {
              setLoggedUser(() => (
                <BrowserRouter>
                  <Redirect to='/kitchen' />
                  <Switch>
                    <Route path='/kitchen' component={Kitchen} />
                  </Switch>
                </BrowserRouter>
              ));
            } else {
              setLoggedUser(() => (
                <BrowserRouter>
                  <Redirect to='/hall' />
                  <Switch>
                    <Route path='/hall' component={Hall} />
                  </Switch>
                </BrowserRouter>
              ));
            }
          });
      } else {
        setLoggedUser(() => (
          <BrowserRouter>
            <Redirect to='/login' />
            <Switch>
              <Route path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
            </Switch>
          </BrowserRouter>
        ));
      }
    });
  }, []);

  return <>{loggedUser}</>;
};

export default App;
