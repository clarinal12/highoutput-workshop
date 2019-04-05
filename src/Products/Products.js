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

//Mutations and Queries
import { Query, Mutation } from "react-apollo";
import { PRODUCTS, DELETE_PRODUCT } from "../Constants/QueryTemplates";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleRemoveSuccess = () => {
    const { toBeRemoved } = this.state;
    this.setState({
      removeSuccessMessage: `Successfully Removed ${toBeRemoved.name}`,
      confirmRemoveModal: false
    });
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
      removeSuccessModal,
      confirmRemoveModal,
      toBeRemoved,
      removeSuccessMessage,
      errorMessage,
      hasError
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
        <Mutation
          mutation={DELETE_PRODUCT}
          onCompleted={data => this.handleRemoveSuccess()}
          onError={error => this.handleRemoveFail()}
        >
          {deleteProduct => (
            <ConfirmRemoveModal
              type="danger"
              title="Confirm Remove Product"
              center={true}
              isOpen={confirmRemoveModal}
              toggle={this.toggleConfirmRemoveModal}
              isConfirm={true}
              onConfirm={() =>
                deleteProduct({ variables: { id: toBeRemoved.id } })
              }
            >
              Are you sure you want to remove the product: {toBeRemoved.name}
            </ConfirmRemoveModal>
          )}
        </Mutation>
        <ProductsPanel>
          <Link to="/products/create">
            <Button color="primary" className="create-product-button">
              Create New Product
            </Button>
          </Link>
          {hasError && <Alert color="danger">{errorMessage}</Alert>}
          <Query query={PRODUCTS} pollInterval={1000}>
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <center className="no-products mt-5">
                    <h5>Fetching Products...</h5>
                  </center>
                );
              }
              if (error) {
                return <Alert color="danger">{error.message}</Alert>;
              }
              if (data.products.length === 0) {
                return (
                  <center className="no-products mt-5">
                    <h5>No products yet.</h5>
                  </center>
                );
              }
              if (data) {
                return (
                  <Row className="card-panel">
                    {data.products.map((product, index) => {
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
                );
              }
            }}
          </Query>
        </ProductsPanel>
      </ProductsWrapper>
    );
  }
}

export default SignUp;
