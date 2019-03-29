import React, { Component } from "react";

//Forms
import LoginForm from "./LoginForm";

//Styles
import { Wrapper } from "./styles";

//Components
import DialogModal from "../DialogModal";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogModal: false,
      loginResponse: null
    };
  }

  toggleDialogModal = () => {
    this.setState(prevState => ({
      dialogModal: !prevState.dialogModal
    }));
  };

  login = values => {
    console.log(values);
    this.handleLoginSuccess();
    this.toggleDialogModal();
  };

  handleLoginSuccess = () => {
    this.setState({ loginResponse: "success" });
  };

  handleLoginFail = () => {
    this.setState({ loginResponse: "failed" });
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
        <LoginForm handleLogin={this.login} />
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
