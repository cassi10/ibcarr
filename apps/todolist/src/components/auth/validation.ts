import { string, object } from "yup";

const emailValidation = string()
  .trim()
  .email("Invalid email")
  .required("You must provide an email");

const passwordValidation = string().required("You must provide a password.");

const newPasswordValidation = string()
  .min(8, "Must be at least 8 characters long.")
  .matches(/[a-z]/g, "Must contain at least 1 lowercase character.")
  .matches(/[A-Z]/g, "Must contain at least 1 uppercase character.")
  .matches(/\d/g, "Must contain at least 1 number.")
  .required("You must provide a password.");

const usernameValidation = string()
  .matches(/^\S+$/g, "Cannot contain spaces.")
  .min(4, "Must be at least 4 characters long.")
  .max(30, "Cannot be longer than 30 characters.")
  .required("You must provide a username.");

const EmailSchema = object().shape({
  email: emailValidation
});

const SignInSchema = object().shape({
  email: emailValidation,
  password: passwordValidation
});

const SignUpSchema = object().shape({
  email: emailValidation,
  username: usernameValidation,
  password: newPasswordValidation
});

export { EmailSchema, SignInSchema, SignUpSchema };
