import React from "react";
import { Link } from "react-router-dom";

//ReactStrap
import { FormGroup, Input, FormFeedback, Alert } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import ProductValidation from "./ProductValidation";

//Styles
import { FloatRightButton, FloatLeftButton, ProductPanel } from "./styles";

//Mutations and Queries
import { PRODUCTS } from "../Constants/QueryTemplates";

const ProductForm = props => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    product,
    error,
    loading
  } = props;
  const isInvalidName = errors.name && touched.name;
  const isInvalidDescription = errors.description && touched.description;
  const isInvalidPrice = errors.price && touched.price;
  const isInvalidQuantity = errors.quantity && touched.quantity;

  return (
    <ProductPanel>
      <h5 className="mb-4">{product.id ? "Edit Product" : "Create Product"}</h5>
      <Form>
        {error && <Alert color="danger">{error.message}</Alert>}
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            invalid={isInvalidName}
          />
          {isInvalidName && (
            <FormFeedback>
              <ErrorMessage name="name" />
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="description"
            type="text"
            placeholder="Description"
            value={values.description}
            invalid={isInvalidDescription}
          />
          {isInvalidDescription && (
            <FormFeedback>
              <ErrorMessage name="description" />
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={values.quantity}
            invalid={isInvalidQuantity}
          />
          {isInvalidQuantity && (
            <FormFeedback>
              <ErrorMessage name="quantity" />
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="price"
            type="number"
            placeholder="Price"
            value={values.price}
            invalid={isInvalidPrice}
          />
          {isInvalidPrice && (
            <FormFeedback>
              <ErrorMessage name="price" />
            </FormFeedback>
          )}
        </FormGroup>
        <Link to="/products">
          <FloatLeftButton color="link" type="button">
            Back
          </FloatLeftButton>
        </Link>
        <FloatRightButton color="primary" disabled={loading} type="submit">
          {loading ? "Submitting..." : "Submit"}
        </FloatRightButton>
      </Form>
    </ProductPanel>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    name: props.product.name,
    description: props.product.description,
    price: props.product.price,
    quantity: props.product.quantity,
    id: props.product.id,
    mutateAction: props.onSubmit
  }),
  handleSubmit: async (values, { resetForm }) => {
    const { mutateAction, name, description, price, quantity, id } = values;
    let data = {};
    if (id) {
      data = {
        id,
        input: {
          name,
          description,
          price: Number(price),
          quantity: Number(quantity)
        }
      };
    } else {
      data = {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity)
      };
    }
    const response = await mutateAction({
      variables: { ...data },
      refetchQueries: [{ query: PRODUCTS }]
    });
    if (response && !id) resetForm();
  },
  validationSchema: ProductValidation
})(ProductForm);
