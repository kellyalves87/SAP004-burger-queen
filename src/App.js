import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
