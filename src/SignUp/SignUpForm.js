import React from "react";
import { Link } from "react-router-dom";

//ReactStrap
import { FormGroup, Input, FormFeedback, Alert } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import SignUpValidation from "./SignUpValidation";

//Styles
import { FloatRightButton, FloatLeftButton, SignUpPanel } from "./styles";

const SignUpForm = props => {
  const {
    touched,
    errors,
    handleChange,
    handleBlur,
    values,
    error,
    loading
  } = props;

  const isInvalidEmail = errors.email && touched.email;
  const isInvalidPassword = errors.password && touched.password;
  const isInvalidPasswordConfirmation =
    errors.passwordConfirmation && touched.passwordConfirmation;
  const isInvalidName = errors.name && touched.name;

  return (
    <SignUpPanel>
      <Form>
        {error && <Alert color="danger">{error.message}</Alert>}
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            invalid={isInvalidEmail}
          />
          {isInvalidEmail && (
            <FormFeedback>
              <ErrorMessage name="email" />
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            invalid={isInvalidPassword}
          />
          {isInvalidPassword && (
            <FormFeedback>
              <ErrorMessage name="password" />
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="passwordConfirmation"
            type="password"
            placeholder="Re-type Password"
            value={values.passwordConfirmation}
            invalid={isInvalidPasswordConfirmation}
          />
          {isInvalidPasswordConfirmation && (
            <FormFeedback>
              <ErrorMessage name="passwordConfirmation" />
            </FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            type="text"
            placeholder="Full Name"
            value={values.name}
            invalid={isInvalidName}
          />
          {isInvalidName && (
            <FormFeedback>
              <ErrorMessage name="name" />
            </FormFeedback>
          )}
        </FormGroup>
        <Link to="/login">
          <FloatLeftButton color="link" type="button">
            Log In
          </FloatLeftButton>
        </Link>
        <FloatRightButton color="primary" disabled={loading} type="submit">
          {loading ? "Signing Up..." : "Sign Up"}
        </FloatRightButton>{" "}
      </Form>
    </SignUpPanel>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    signup: props.onSubmit
  }),
  handleSubmit: async (values, { resetForm }) => {
    const { signup, email, password, name } = values;
    const response = await signup({ variables: { email, password, name } });
    if (response) resetForm();
  },
  validationSchema: SignUpValidation
})(SignUpForm);
