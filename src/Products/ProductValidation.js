import * as yup from "yup";

const ProductValidation = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required()
});

export default ProductValidation;
