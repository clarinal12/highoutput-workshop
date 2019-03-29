import React, { Component } from "react";

//Forms
import ProductForm from "./ProductForm";

//Styles
import { ProductWrapper } from "./styles";

//Components
import DialogModal from "../DialogModal";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 100,
          description: "Sample description for product 1",
          quantity: 20
        },
        {
          id: 2,
          name: "Product 2",
          price: 44,
          description: "Sample description for product 2",
          quantity: 12
        }
      ],
      dialogModal: false,
      hasError: false
    };
  }

  createProduct = params => {
    console.log(params);
    this.setState({ hasError: false });
    this.handleCreateProductSuccess();
  };

  editProduct = params => {
    console.log(params);
    this.setState({ hasError: false });
    this.handleEditProductSuccess();
  };

  handleCreateProductSuccess = () => {
    this.toggleDialogModal();
  };

  handleCreateProductFail = () => {
    this.setState({ hasError: true });
  };

  handleEditProductSuccess = () => {
    this.toggleDialogModal();
  };

  handleEditProductFail = () => {
    this.setState({ hasError: true });
  };

  toggleDialogModal = () => {
    this.setState(prevState => ({
      dialogModal: !prevState.dialogModal
    }));
  };

  render() {
    const { match } = this.props;
    const { dialogModal, hasError } = this.state;
    let product = {
        name: "",
        description: "",
        quantity: "",
        price: ""
      },
      submitAction = this.createProduct,
      dialogTitle = "Create Success",
      dialogMessage = "You have successfully created a product";

    if (match.params.id) {
      product = this.state.products.filter(
        prod => Number(prod.id) === Number(match.params.id)
      );
      product = product[0];
      submitAction = this.editProduct;
      dialogTitle = "Edit Success";
      dialogMessage = "You have successfully edited a product";
    }

    return (
      <ProductWrapper className="container">
        <DialogModal
          type="success"
          title={dialogTitle}
          centered={true}
          isOpen={dialogModal}
          toggle={this.toggleDialogModal}
        >
          <center>{dialogMessage}</center>
        </DialogModal>
        <ProductForm
          hasError={hasError}
          handleSubmitAction={submitAction}
          product={product}
        />
      </ProductWrapper>
    );
  }
}

export default Product;
