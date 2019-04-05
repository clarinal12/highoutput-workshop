import gql from "graphql-tag";

const SIGN_UP = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

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

const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const PRODUCTS = gql`
  {
    products {
      id
      name
      description
      quantity
      price
    }
  }
`;

export {
  SIGN_UP,
  LOGIN,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  PRODUCTS
};
