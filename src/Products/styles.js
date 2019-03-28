import styled from "styled-components";
import { Button, CardFooter, Card } from "reactstrap";

const ProductsWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  margin: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const ProductWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  margin: auto;
`;

const FloatRightButton = styled(Button)`
  float: right;
`;

const ProductsPanel = styled.div`
  position: relative;
  padding: 5em 1em 1em;
  border: 1px solid #d8d8d8;
  width: 100%;
  ::before {
    position: absolute;
    left: -10px;
    top: -15px;
    padding: 1em;
    color: #aaa;
    font-size: x-large;
    font-weight: 500;
    content: "Products";
  }
  .create-product-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const ProductPanel = styled.div`
  position: relative;
  padding: 1em 1em 1em;
  border: 1px solid #d8d8d8;
  margin: auto;
  width: 350px;
  ::before {
    position: absolute;
    left: -10px;
    top: -15px;
    padding: 1em;
    color: #aaa;
    font-size: x-large;
    font-weight: 500;
  }
`;

const ProductCard = styled(Card)`
  margin-bottom: 30px;
  .product-quantity {
    font-size: 16px;
  }
  .product-description {
    font-size: 18px;
  }
`;

const ProductCardFooter = styled(CardFooter)`
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem !important;
`;

const ProductCardTitle = styled.span`
  display: flex;
  justify-content: space-between;
  .product-name {
    font-size: 26px;
    margin-right: 10px;
  }
  .product-price {
    font-size: 20px;
  }
  margin-bottom: 20px;
`;

export {
  ProductsWrapper,
  ProductWrapper,
  FloatRightButton,
  ProductsPanel,
  ProductPanel,
  ProductCardFooter,
  ProductCardTitle,
  ProductCard
};
