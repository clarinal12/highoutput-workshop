import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

//Pages
import Login from "./Login";
import SignUp from "./SignUp";
import Products from "./Products";
import Product from "./Products/Product";

const Index = () => {
  return (
    <div className="container">
      <center className="mt-5">
        <h1>Home Page</h1>
        <br />
        <p>
          Please go to our <Link to="/login">Login,</Link>
          <Link to="/signup"> Sign Up</Link> or{" "}
          <Link to="/products">Products</Link> page.
        </p>
      </center>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute path="/products/create" component={Product} />
        <ProtectedRoute path="/products/edit/:id" component={Product} />
      </Router>
    );
  }
}

export default App;
