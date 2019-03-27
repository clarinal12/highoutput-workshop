import React, { Component } from "react";

//Styles
import { Wrapper } from "./styles";

//Forms
import SignUpForm from "./SignUpForm";

//Components
import DialogModal from "../DialogModal";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogModal: false,
      signUpResponse: null
    };

    this.toggleDialogModal = this.toggleDialogModal.bind(this);
    this.signup = this.signup.bind(this);
  }

  toggleDialogModal() {
    this.setState(prevState => ({
      dialogModal: !prevState.dialogModal
    }));
  }

  signup(values) {
    console.log(values);
    this.handleSignUpSuccess();
    this.toggleDialogModal();
  }

  handleSignUpSuccess() {
    this.setState({ signUpResponse: "success" });
  }

  handleSignUpFail() {
    this.setState({ signUpResponse: "failed" });
  }

  getDialogModalProperty(response) {
    if (response === "success")
      return {
        type: "success",
        message: "Your account is now active.",
        title: "Sign Up Success"
      };
    else if (response === "failed")
      return {
        type: "danger",
        message: "You have failed to sign up.",
        title: "Sign Up Fail"
      };
    else
      return {
        type: "info",
        message: "Sample Dialog Message",
        title: "Sample Dialog Title"
      };
  }

  render() {
    const { dialogModal, signUpResponse } = this.state;
    const dialogModalProperty = this.getDialogModalProperty(signUpResponse);

    return (
      <Wrapper className="container">
        <SignUpForm handleSignUp={this.signup} />
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

export default SignUp;
