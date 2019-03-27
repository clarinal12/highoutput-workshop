import * as yup from "yup";

const SignUpValidation = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(16)
    .oneOf([yup.ref("passwordConfirmation"), null], "passwords must match")
    .required(),
  passwordConfirmation: yup
    .string()
    .min(8, "password confirmation must be at least 8 character")
    .max(16, "password confirmation must be at most 16 characters")
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("password confirmation is a required field"),
  fullName: yup.string().required("full name is a required field")
});

export default SignUpValidation;
