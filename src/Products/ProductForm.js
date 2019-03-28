import React from "react";

//ReactStrap
import { FormGroup, Input, FormFeedback } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import ProductValidation from "./ProductValidation";

//Styles
import { FloatRightButton, ProductPanel } from "./styles";

const ProductsForm = props => {
  const { productId } = props;
  return (
    <ProductPanel>
      <h5 className="mb-4">{productId ? "Edit Product" : "Create Product"}</h5>
      <Form>
        <FormGroup>
          <Input />
          <FormFeedback>
            <ErrorMessage name="email" />
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input />
          <FormFeedback>
            <ErrorMessage name="password" />
          </FormFeedback>
        </FormGroup>
        <FloatRightButton type="submit">Create</FloatRightButton>
      </Form>
    </ProductPanel>
  );
};

export default ProductsForm;
