import React, { Component } from "react";

//Forms
import LoginForm from "./LoginForm";

//Styles
import { Wrapper } from "./styles";

//Mutations and Queries
import { Mutation } from "react-apollo";
import { LOGIN } from "../Constants/QueryTemplates";

class Login extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("accessToken")) {
      this.props.history.push("/products");
    }
  }

  handleLoginSuccess = data => {
    localStorage.setItem("accessToken", data.login);
    this.props.history.push("/products");
  };

  render() {
    return (
      <Wrapper className="container">
        <Mutation
          mutation={LOGIN}
          onCompleted={data => this.handleLoginSuccess(data)}
        >
          {(login, { loading, error }) => (
            <LoginForm loading={loading} error={error} onSubmit={login} />
          )}
        </Mutation>
      </Wrapper>
    );
  }
}

export default Login;
