import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Hall from '../src/pages/hall/Hall';
import Kitchen from '../src/pages/kitchen/Kitchen';
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signup/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
          {/* <PrivateRoute exact path='/hall' component={Hall} />
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route> */}
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/kitchen' component={Kitchen} />
          <PrivateRoute exact path='/hall' component={Hall} />
          <Redirect to='/login' />
          <Route exact path='/signup' component={SignUp} />          
          </Router>
    </AuthProvider>
  );
};


export default App;
