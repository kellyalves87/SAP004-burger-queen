import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./firebase/Auth";
import PrivateRoute from './route/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute exact path='/' component={Home} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
