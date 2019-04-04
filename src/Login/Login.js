import React, { Component } from "react";

//Forms
import LoginForm from "./LoginForm";

//Styles
import { Wrapper } from "./styles";

//Components
import DialogModal from "../DialogModal";

//Mutations and Queries
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogModal: false,
      loginResponse: null
    };
    if (localStorage.getItem("accessToken")) {
      this.props.history.push("/products");
    }
  }

  toggleDialogModal = () => {
    this.setState(prevState => ({
      dialogModal: !prevState.dialogModal
    }));
  };

  handleLoginSuccess = data => {
    localStorage.setItem("accessToken", data.login);
    this.props.history.push("/products");
    // this.setState({ loginResponse: "success" });
    // this.toggleDialogModal();
  };

  handleLoginFail = error => {
    this.setState({ loginResponse: "failed" });
    this.toggleDialogModal();
  };

  getDialogModalProperty = response => {
    if (response === "success")
      return {
        type: "success",
        message: "You are now logged in.",
        title: "Login Success"
      };
    else if (response === "failed")
      return {
        type: "danger",
        message: "You have failed to log in",
        title: "Login Fail"
      };
    else
      return {
        type: "info",
        message: "Sample Dialog Message",
        title: "Sample Dialog Title"
      };
  };

  render() {
    const { dialogModal, loginResponse } = this.state;
    const dialogModalProperty = this.getDialogModalProperty(loginResponse);

    return (
      <Wrapper className="container">
        <Mutation
          mutation={LOGIN}
          onCompleted={data => this.handleLoginSuccess(data)}
          onError={error => this.handleLoginFail(error)}
        >
          {(login, { loading, error }) => (
            <LoginForm loading={loading} error={error} onSubmit={login} />
          )}
        </Mutation>
        <DialogModal
          type={dialogModalProperty.type}
          title={dialogModalProperty.title}
          centered={true}
          isOpen={dialogModal}
          toggle={this.toggleDialogModal}
        >
          <center>{dialogModalProperty.message}</center>
        </DialogModal>
      </Wrapper>
    );
  }
}

export default Login;
