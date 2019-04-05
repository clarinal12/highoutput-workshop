import React, { Component } from "react";

//Forms
import ProductForm from "./ProductForm";

//Styles
import { ProductWrapper } from "./styles";

//Components
import DialogModal from "../DialogModal";

//Mutations and Queries
import { Mutation } from "react-apollo";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../Constants/QueryTemplates";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogModal: false,
      dialogType: "success",
      dialogTitle: "",
      dialogMessage: ""
    };
  }

  handleSuccess = data => {
    const { match } = this.props;

    this.setState({
      dialogType: "success",
      dialogTitle: `${match.params.id ? "Edit" : "Create"} Product Success`,
      dialogMessage: `You have successfully ${
        match.params.id ? "edited" : "created"
      } a product`,
      dialogModal: true
    });
  };

  handleError = error => {
    const { match } = this.props;

    this.setState({
      dialogType: "danger",
      dialogTitle: `${match.params.id ? "Edit" : "Create"} Product Failed`,
      dialogMessage: `You have failed ${
        match.params.id ? "edited" : "created"
      } a product`,
      dialogModal: true
    });
  };

  toggleDialogModal = () => {
    this.setState(prevState => ({
      dialogModal: !prevState.dialogModal
    }));
  };

  render() {
    const { match } = this.props;
    const { dialogModal, dialogMessage, dialogTitle, dialogType } = this.state;
    let product = {
        id: null,
        name: "",
        description: "",
        quantity: "",
        price: ""
      },
      productMutation = CREATE_PRODUCT;

    if (match.params.id) {
      product =
        (this.props.location.state && this.props.location.state.product) || {};
      productMutation = UPDATE_PRODUCT;
    }

    return (
      <ProductWrapper className="container">
        <DialogModal
          type={dialogType}
          title={dialogTitle}
          centered={true}
          isOpen={dialogModal}
          toggle={this.toggleDialogModal}
        >
          <center>{dialogMessage}</center>
        </DialogModal>
        <Mutation
          mutation={productMutation}
          onCompleted={data => this.handleSuccess(data)}
          onError={error => this.handleError(error)}
        >
          {(mutateAction, { loading, error }) => (
            <ProductForm
              loading={loading}
              error={error}
              onSubmit={mutateAction}
              product={product}
            />
          )}
        </Mutation>
      </ProductWrapper>
    );
  }
}

export default Product;
