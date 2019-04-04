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
  const { touched, errors, handleChange, handleBlur, error, loading } = props;

  const isInvalidEmail = errors.email && touched.email;
  const isInvalidPassword = errors.password && touched.password;
  const isInvalidPasswordConfirmation =
    errors.passwordConfirmation && touched.passwordConfirmation;
  const isInvalidName = errors.name && touched.name;

  return (
    <SignUpPanel>
      <Form>
        {error && <Alert color="danger">Failed to sign up</Alert>}
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="email"
            placeholder="Email"
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
  handleSubmit: values => {
    const { signup, email, password, name } = values;
    signup({ variables: { email, password, name } });
  },
  validationSchema: SignUpValidation
})(SignUpForm);
