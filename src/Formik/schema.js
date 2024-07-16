import * as yup from 'yup';

export const signinSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .trim()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password length must be above or equal to 8 characters.'),
    confirmPassword: yup
      .string()
      .required('Confirm Password Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    currency: yup.string().required('Currency is required'),
    country: yup.string().required('Country is required'),
  })
  .required();
