import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { Wrapper } from "./styles";
import DialogModal from "../DialogModal";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogModal: false,
      loginResponse: null
    };

    this.toggleDialogModal = this.toggleDialogModal.bind(this);
    this.login = this.login.bind(this);
  }

  toggleDialogModal() {
    this.setState(prevState => ({
      dialogModal: !prevState.dialogModal
    }));
  }

  login(params) {
    this.handleLoginSuccess();
    this.toggleDialogModal();
  }

  handleLoginSuccess() {
    this.setState({ loginResponse: "success" });
  }

  handleLoginFail() {
    this.setState({ loginResponse: "failed" });
  }

  getDialogModalProperty(response) {
    if (response === "success")
      return { type: "success", message: "You have successfully logged in" };
    else if (response === "failed")
      return { type: "danger", message: "You have failed logged in" };
    else return { type: "info", message: "Sample Dialog Message" };
  }

  render() {
    const { dialogModal, loginResponse } = this.state;
    const dialogModalProperty = this.getDialogModalProperty(loginResponse);

    return (
      <Wrapper className="container">
        <LoginForm handleLogin={this.login} />
        <DialogModal
          type={dialogModalProperty.type}
          title="Login Success"
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
