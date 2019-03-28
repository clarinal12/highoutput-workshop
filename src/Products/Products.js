import React, { Component } from "react";
import { Link } from "react-router-dom";

//Reactstrap
import { Button, Row, Col, Alert } from "reactstrap";

//Styles
import { ProductsWrapper, ProductsPanel } from "./styles";

//Components
import DialogModal from "../DialogModal";
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
      hasError: false
    };

    // this.toggleDialogModal = this.toggleDialogModal.bind(this);
    // this.login = this.login.bind(this);
  }

  render() {
    const { products, hasError } = this.state;

    return (
      <ProductsWrapper className="container">
        <ProductsPanel>
          <Link to="/products/create">
            <Button color="primary" className="create-product-button">
              Create New Product
            </Button>
          </Link>
          {hasError && <Alert color="danger">Some error occured</Alert>}
          <Row className="card-panel">
            {products.map((product, index) => {
              return (
                <Col key={index} md="4">
                  <ProductsItemCard {...product} />
                </Col>
              );
            })}
          </Row>
          {products.length == 0 && (
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
