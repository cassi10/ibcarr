import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage
} from "@chakra-ui/react";
import { Field, FieldAttributes, FormikState } from "formik";
import { HTMLInputTypeAttribute } from "react";

type FormFieldProperties = {
  name: "email" | "username" | "password";
  id: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label: string;
};

const FormField: React.FC<FormFieldProperties> = ({
  name,
  id,
  placeholder = "",
  type,
  label
}) => (
  <Field name={name}>
    {({
      field,
      form
    }: {
      field: FieldAttributes<never>;
      form: FormikState<{ [key: string]: string }>;
    }): JSX.Element => (
      <FormControl
        isInvalid={form.errors[name] !== undefined && form.touched[name]}
      >
        <FormLabel htmlFor={id} pb={1}>
          {label}
        </FormLabel>
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          id={id}
          placeholder={placeholder}
          type={type}
          variant="flushed"
        />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export const EmailField: React.FC = () => (
  <FormField
    name="email"
    id="email"
    placeholder="john@acme.com"
    type="email"
    label="Email"
  />
);

export const UsernameField: React.FC = () => (
  <FormField
    name="username"
    id="username"
    placeholder="john110"
    type="text"
    label="Username"
  />
);

export const PasswordField: React.FC = () => (
  <FormField name="password" id="password" type="password" label="Password" />
);

export const ChoosePasswordField: React.FC = () => (
  <FormField
    name="password"
    id="password"
    type="password"
    label="Choose Password"
  />
);
