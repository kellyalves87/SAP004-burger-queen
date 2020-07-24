import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
        <div>
          <PrivateRoute exact path='/' component={Hall} />
          <PrivateRoute exact path='/' component={Kitchen} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />          
        </div>
      </Router>
    </AuthProvider>
  );
};


export default App;
