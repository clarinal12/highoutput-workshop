import React from "react";
import { Link } from "react-router-dom";

//ReactStrap
import { FormGroup, Input, FormFeedback, Alert } from "reactstrap";

//Formik
import { withFormik, ErrorMessage, Form } from "formik";

//Validations
import LoginValidation from "./LoginValidation";

//Styles
import { FloatRightButton, LoginPanel } from "./styles";

const LoginForm = props => {
  const { touched, errors, handleChange, handleBlur, loading, error } = props;
  const isInvalidEmail = errors.email && touched.email;
  const isInvalidPassword = errors.password && touched.password;
  return (
    <LoginPanel>
      <Form>
        {error && <Alert color="danger">{error.message}</Alert>}
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
        <FloatRightButton color="primary" disabled={loading} type="submit">
          {loading ? "Logging In..." : "Login"}
        </FloatRightButton>
        <br />
        <center className="mt-5">
          No account yet? <Link to="/signup">Sign up here.</Link>
        </center>
      </Form>
    </LoginPanel>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    email: "",
    password: "",
    login: props.onSubmit
  }),
  handleSubmit: values => {
    const { login, email, password } = values;
    login({ variables: { email, password } });
  },
  validationSchema: LoginValidation
})(LoginForm);
