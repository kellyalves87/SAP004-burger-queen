import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../src/pages/home/Home';
import Login from "../src/pages/login/Login";
import SignUp from "../src/pages/signup/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />          
        </div>
      </Router>
    </AuthProvider>
  );
};


export default App;
