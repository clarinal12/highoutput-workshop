import React, { Component } from "react";

//Forms
import ProductForm from "./ProductForm";

//Styles
import { ProductWrapper } from "./styles";

//Components
import DialogModal from "../DialogModal";

//Mutations and Queries
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $description: String!
    $quantity: Float!
    $price: Float!
  ) {
    createProduct(
      name: $name
      description: $description
      quantity: $quantity
      price: $price
    ) {
      id
      name
      description
      quantity
      price
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      quantity
      price
    }
  }
`;

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

  handleSuccess = data => {};

  handleError = error => {};

  createProduct = params => {
    this.setState({ hasError: false });
    this.handleCreateProductSuccess();
  };

  editProduct = params => {
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

  componentDidMount() {}

  render() {
    const { match } = this.props;
    const { dialogModal } = this.state;
    let product = {
        id: null,
        name: "",
        description: "",
        quantity: "",
        price: ""
      },
      productMutation = CREATE_PRODUCT,
      dialogTitle = "Create Success",
      dialogMessage = "You have successfully created a product";

    if (match.params.id) {
      product =
        (this.props.location.state && this.props.location.state.product) || {};
      productMutation = UPDATE_PRODUCT;
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
