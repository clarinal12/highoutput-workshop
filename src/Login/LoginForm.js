import React from "react";
import { Link } from "react-router-dom";

//ReactStrap
import { FormGroup, Input, FormFeedback } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import LoginValidation from "./LoginValidation";

//Styles
import { FloatRightButton, LoginPanel } from "./styles";

const LoginForm = props => {
  const { touched, errors, handleChange, handleBlur } = props;

  const invalidEmail = errors.email && touched.email;
  const invalidPassword = errors.password && touched.password;

  return (
    <LoginPanel>
      <Form>
        <FormGroup>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            type="text"
            placeholder="Email"
            invalid={invalidEmail}
          />
          {invalidEmail && (
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
            invalid={invalidPassword}
          />
          {invalidPassword && (
            <FormFeedback>
              <ErrorMessage name="password" />
            </FormFeedback>
          )}
        </FormGroup>
        <center className="mb-3">
          No account yet? <Link to="/signup">Sign up here.</Link>
        </center>
        <FloatRightButton type="submit">Submit</FloatRightButton>
      </Form>
    </LoginPanel>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),
  // Handles our submission
  handleSubmit: (values, { setSubmitting }) => {
    // This is where you could send the submitted values to the backend
    console.log("Submitted Email:", values.email);
    console.log("Submitted Password:", values.password);
    // Simulates the delay of a real request
    setTimeout(() => setSubmitting(false), 3 * 1000);
  },
  validationSchema: LoginValidation
})(LoginForm);
