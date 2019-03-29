import React from "react";

//ReactStrap
import { FormGroup, Input, FormFeedback, Alert } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import ProductValidation from "./ProductValidation";

//Styles
import { FloatRightButton, ProductPanel } from "./styles";

const ProductForm = props => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    isSubmitting,
    product,
    hasError
  } = props;
  const isInvalidName = errors.name && touched.name;
  const isInvalidDescription = errors.description && touched.description;
  const isInvalidPrice = errors.price && touched.price;
  const isInvalidQuantity = errors.quantity && touched.quantity;
  return (
    <ProductPanel>
      <h5 className="mb-4">{product.id ? "Edit Product" : "Create Product"}</h5>
      <Form>
        {hasError && (
          <Alert color="danger">{`Failed to ${
            product.id ? "edit" : "create"
          } product`}</Alert>
        )}
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
            type="text"
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
            type="text"
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
        <FloatRightButton color="primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
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
    submitAction: props.handleSubmitAction
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const { submitAction } = values;
    setTimeout(() => {
      submitAction(values);
      setSubmitting(false);
    }, 2 * 1000);
  },
  validationSchema: ProductValidation
})(ProductForm);
