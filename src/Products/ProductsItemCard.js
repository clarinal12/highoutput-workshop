import React from "react";
import { Link } from "react-router-dom";

//Reactstrap
import { CardBody, CardText, Button } from "reactstrap";

//styles
import { ProductCardFooter, ProductCardTitle, ProductCard } from "./styles";

const ProductsItemCard = props => {
  const { name, description, quantity, price, id, onRemoveClick } = props;
  const product = { name, description, quantity, price, id };

  return (
    <ProductCard>
      <CardBody>
        <ProductCardTitle>
          <span className="product-name">{name}</span>
          <span className="product-price">PHP {price}</span>
        </ProductCardTitle>
        <CardText className="product-description mb-3">{description}</CardText>
        <CardText className="product-quantity">{quantity} items</CardText>
      </CardBody>
      <ProductCardFooter>
        <Link
          to={{
            pathname: `/products/edit/${id}`,
            state: {
              product
            }
          }}
        >
          <Button color="link">Edit</Button>
        </Link>
        <Button onClick={() => onRemoveClick(props)} color="link">
          Remove
        </Button>
      </ProductCardFooter>
    </ProductCard>
  );
};

export default ProductsItemCard;
