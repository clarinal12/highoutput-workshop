import React from "react";

//ReactStrap
import { FormGroup, Input, FormFeedback } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import SignUpValidation from "./SignUpValidation";

//Styles
import { FloatRightButton, SignUpPanel } from "./styles";

const SignUpForm = props => {
  const { touched, errors, handleChange, handleBlur, isSubmitting } = props;

  const isInvalidEmail = errors.email && touched.email;
  const isInvalidPassword = errors.password && touched.password;
  const isInvalidPasswordConfirmation =
    errors.passwordConfirmation && touched.passwordConfirmation;
  const isInvalidFullName = errors.fullName && touched.fullName;

  return (
    <SignUpPanel>
      <Form>
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
            name="fullName"
            type="text"
            placeholder="Full Name"
            invalid={isInvalidFullName}
          />
          {isInvalidFullName && (
            <FormFeedback>
              <ErrorMessage name="fullName" />
            </FormFeedback>
          )}
        </FormGroup>
        <FloatRightButton disabled={isSubmitting} type="submit">
          {isSubmitting ? "Signing Up..." : "Sign Up"}
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
    fullName: "",
    signup: props.handleSignUp
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const { signup } = values;

    setTimeout(() => {
      signup(values);
      setSubmitting(false);
    }, 2 * 1000);
  },
  validationSchema: SignUpValidation
})(SignUpForm);
