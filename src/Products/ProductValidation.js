import * as yup from "yup";

const ProductValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  quantity: yup
    .number()
    .typeError("quantity must be a number")
    .positive()
    .required(),
  price: yup
    .number()
    .typeError("price must be a number")
    .positive()
    .required()
});

export default ProductValidation;
