import { string, object, boolean } from "yup";

const emailValidation = string()
  .trim()
  .required("You must provide an email.")
  .matches(/^([^@])+(@)((\w)+\.)+(\w){2,}$/i, "Invalid email.");

const passwordValidation = string().required("You must provide a password.");

const newPasswordValidation = string()
  .required("You must provide a password.")
  .min(8, "Must be at least 8 characters long.")
  .matches(/[a-z]/g, "Must contain at least 1 lowercase character.")
  .matches(/[A-Z]/g, "Must contain at least 1 uppercase character.")
  .matches(/\d/g, "Must contain at least 1 number.");

const usernameValidation = string()
  .trim()
  .required("You must provide a username.")
  .matches(/^\S+$/g, "Cannot contain spaces.")
  .min(4, "Must be at least 4 characters long.")
  .max(30, "Cannot be longer than 30 characters.");

const rememberMeValidation = boolean();

const EmailSchema = object().shape({
  email: emailValidation
});

const SignInSchema = object().shape({
  email: emailValidation,
  password: passwordValidation,
  rememberMe: rememberMeValidation
});

const SignUpSchema = object().shape({
  email: emailValidation,
  username: usernameValidation,
  password: newPasswordValidation,
  rememberMe: rememberMeValidation
});

export { EmailSchema, SignInSchema, SignUpSchema };
