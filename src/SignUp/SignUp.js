import React, { Component } from "react";

//Styles
import { Wrapper } from "./styles";

//Forms
import SignUpForm from "./SignUpForm";

//Components
import DialogModal from "../DialogModal";

//Mutations and Queries
import { Mutation } from "react-apollo";
import { SIGN_UP } from "../Constants/QueryTemplates";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogModal: false,
      signUpResponse: null,
      hasError: false
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

  handleSignUpSuccess = data => {
    this.setState({ signUpResponse: "success" });
    this.toggleDialogModal();
  };

  handleSignUpFail = error => {
    this.setState({ signUpResponse: "failed", hasError: true });
    this.toggleDialogModal();
  };

  getDialogModalProperty = response => {
    if (response === "success")
      return {
        type: "success",
        message: "Your account is now active. You can now login",
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
  };

  render() {
    const { dialogModal, signUpResponse } = this.state;
    const dialogModalProperty = this.getDialogModalProperty(signUpResponse);

    return (
      <Wrapper className="container">
        <Mutation
          mutation={SIGN_UP}
          onCompleted={data => this.handleSignUpSuccess(data)}
          onError={error => this.handleSignUpFail(error)}
        >
          {(register, { loading, error }) => (
            <SignUpForm loading={loading} error={error} onSubmit={register} />
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

export default SignUp;
