import React, { Component } from "react";
import { Link } from "react-router-dom";

//Reactstrap
import { Button, Row, Col, Alert } from "reactstrap";

//Styles
import { ProductsWrapper, ProductsPanel } from "./styles";

//Components
import RemoveSuccessModal from "../DialogModal";
import ConfirmRemoveModal from "../DialogModal";
import ProductsItemCard from "./ProductsItemCard";

class SignUp extends Component {
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
      removeSuccessModal: false,
      confirmRemoveModal: false,
      hasError: false,
      errorMessage: "",
      toBeRemoved: {},
      removeSuccessMessage: ""
    };
  }

  toggleConfirmRemoveModal = () => {
    this.setState(prevState => ({
      confirmRemoveModal: !prevState.confirmRemoveModal
    }));
  };

  toggleRemoveSuccessModal = () => {
    this.setState(prevState => ({
      removeSuccessModal: !prevState.removeSuccessModal
    }));
  };

  handleConfirmRemoveProduct = product => {
    this.setState({ toBeRemoved: product });
    this.toggleConfirmRemoveModal();
  };

  removeProduct = product => {
    this.setState({
      removeSuccessMessage: `Successfully Removed ${product.name}`,
      confirmRemoveModal: false
    });
    this.handleRemoveSuccess();
  };

  handleRemoveSuccess = () => {
    this.toggleRemoveSuccessModal();
  };

  handleRemoveFail = () => {
    const { toBeRemoved } = this.state;
    this.setState({
      hasError: true,
      confirmRemoveModal: false,
      errorMessage: `Failed to delete ${toBeRemoved.name}`
    });
  };

  render() {
    const {
      products,
      hasError,
      removeSuccessModal,
      confirmRemoveModal,
      toBeRemoved,
      removeSuccessMessage,
      errorMessage
    } = this.state;

    return (
      <ProductsWrapper className="container">
        <RemoveSuccessModal
          type="success"
          title="Remove Product"
          centered={true}
          isOpen={removeSuccessModal}
          toggle={this.toggleRemoveSuccessModal}
        >
          <center>{removeSuccessMessage}</center>
        </RemoveSuccessModal>
        <ConfirmRemoveModal
          type="danger"
          title="Confirm Remove Product"
          center={true}
          isOpen={confirmRemoveModal}
          toggle={this.toggleConfirmRemoveModal}
          isConfirm={true}
          onConfirm={() => this.removeProduct(toBeRemoved)}
        >
          Are you sure you want to remove the product: {toBeRemoved.name}
        </ConfirmRemoveModal>
        <ProductsPanel>
          <Link to="/products/create">
            <Button color="primary" className="create-product-button">
              Create New Product
            </Button>
          </Link>
          {hasError && (
            <Alert color="danger">{errorMessage || "Some error occured"}</Alert>
          )}
          <Row className="card-panel">
            {products.map((product, index) => {
              return (
                <Col key={index} md="4">
                  <ProductsItemCard
                    onRemoveClick={this.handleConfirmRemoveProduct}
                    {...product}
                  />
                </Col>
              );
            })}
          </Row>
          {products.length === 0 && (
            <center className="no-products mt-5">
              <h5>No products yet.</h5>
            </center>
          )}
        </ProductsPanel>
      </ProductsWrapper>
    );
  }
}

export default SignUp;
