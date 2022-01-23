import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button
} from "@chakra-ui/react";
import { useField } from "formik";
import { HTMLInputTypeAttribute, useState } from "react";
import { type SetStep } from "./form";

type FormFieldProperties = {
  name: "email" | "username" | "password";
  id: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label: string;
  disabled?: boolean;
  helperText?: boolean;
  setStep?: SetStep;
};

const FormField = ({
  name,
  id,
  placeholder = "",
  type,
  label,
  disabled = false,
  helperText = false,
  setStep = undefined
}: FormFieldProperties): JSX.Element => {
  const [field, meta] = useField<string>(name);

  const [didFocus, setDidFocus] = useState<boolean>(false);
  const handleFocus = (): void => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length >= 2) || meta.touched;

  return (
    <FormControl
      isInvalid={showFeedback && meta.error !== undefined}
      isDisabled={disabled}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...field}
        id={id}
        placeholder={placeholder}
        type={type}
        variant="flushed"
        onFocus={handleFocus}
        _disabled={{ cursor: " not-allowed" }}
      />
      {disabled && setStep && helperText && (
        <FormHelperText>
          Not your email address?{" "}
          <Button
            variant="link"
            size="sm"
            colorScheme="gray"
            onClick={(): void => setStep("enterEmail")}
          >
            Start again.
          </Button>
        </FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

type EmailFieldProperties = {
  disabled?: boolean;
  helperText?: boolean;
  setStep?: SetStep;
};

const EmailField = ({
  disabled,
  helperText,
  setStep
}: EmailFieldProperties): JSX.Element => (
  <FormField
    name="email"
    id="email"
    placeholder="john@acme.com"
    type="email"
    label="Email"
    disabled={disabled}
    helperText={helperText}
    setStep={setStep}
  />
);

const UsernameField = (): JSX.Element => (
  <FormField
    name="username"
    id="username"
    placeholder="john110"
    type="text"
    label="Username"
  />
);

const PasswordField = (): JSX.Element => (
  <FormField
    name="password"
    id="password"
    type="password"
    label="Password"
    placeholder="••••••••"
  />
);

const ChoosePasswordField = (): JSX.Element => (
  <FormField
    name="password"
    id="password"
    type="password"
    label="Choose Password"
    placeholder="••••••••"
  />
);

export { EmailField, UsernameField, PasswordField, ChoosePasswordField };
