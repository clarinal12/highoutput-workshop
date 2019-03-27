import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { Wrapper } from "./styles";

class Login extends Component {
  render() {
    return (
      <Wrapper className="container">
        <LoginForm />
      </Wrapper>
    );
  }
}

export default Login;
