import * as yup from "yup";

const LoginValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(16)
    .required()
});

export default LoginValidation;
