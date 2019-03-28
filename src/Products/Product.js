import React from "react";

//Forms
import ProductForm from "./ProductForm";

//Styles
import { ProductWrapper } from "./styles";

const Product = props => {
  const { match } = props;
  return (
    <ProductWrapper className="container">
      <ProductForm productId={match.params.id} />
    </ProductWrapper>
  );
};

export default Product;
