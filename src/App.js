import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Hall from '../src/pages/hall/hall';
import Kitchen from '../src/pages/kitchen/kitchen'
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signup/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
          <PrivateRoute exact path='/hall' component={Hall} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/kitchen' component={Kitchen} /> 
          <Route exact path='/signup' component={SignUp} />          
          </Router>
    </AuthProvider>
  );
};


export default App;
