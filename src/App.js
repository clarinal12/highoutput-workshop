import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from "./components/Index";
import Login from "./Login";
import SignUp from "./SignUp";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Router>
    );
  }
}

export default App;
