import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  Checkbox,
  InputGroup,
  InputRightElement,
  IconButton
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { useField } from "formik";
import { HTMLInputTypeAttribute, useState } from "react";
import { SetStep } from "../../types";

type FormFieldProperties = {
  name: "email" | "username" | "password" | "rememberMe";
  id: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  label: string;
  disabled?: boolean;
  helperText?: boolean;
  setStep?: SetStep;
  passwordToggle?: boolean;
};

const FormField = ({
  name,
  id,
  placeholder = "",
  type,
  label,
  disabled = false,
  helperText = false,
  setStep = undefined,
  passwordToggle = false
}: FormFieldProperties): JSX.Element => {
  const [field, meta] = useField<string>(name);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const trueType = passwordToggle ? (showPassword ? "text" : "password") : type;
  const handleShowPasswordClick = (): void => {
    setShowPassword((previousShowPassword) => !previousShowPassword);
  };

  const [didFocus, setDidFocus] = useState<boolean>(false);
  const handleFocus = (): void => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length > 0) || meta.touched;

  return (
    <FormControl
      isInvalid={showFeedback && meta.error !== undefined}
      isDisabled={disabled}
    >
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        <Input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...field}
          id={id}
          placeholder={placeholder}
          type={trueType}
          variant="flushed"
          onFocus={handleFocus}
          _disabled={{
            cursor: "not-allowed",
            opacity: "0.4"
          }}
        />
        {passwordToggle && (
          <InputRightElement>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={handleShowPasswordClick}
              aria-label="Show or hide password"
              icon={getIconComponent(showPassword ? "show" : "hide")}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {setStep && helperText && (
        <FormHelperText>
          Not your email address?{" "}
          <Button
            variant="link"
            size="sm"
            colorScheme="blue"
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

type PasswordFieldProperties = {
  passwordToggle: boolean;
};

const PasswordField = ({
  passwordToggle
}: PasswordFieldProperties): JSX.Element => (
  <FormField
    name="password"
    id="password"
    type="password"
    label="Password"
    placeholder="••••••••"
    passwordToggle={passwordToggle}
  />
);

const ChoosePasswordField = ({
  passwordToggle
}: PasswordFieldProperties): JSX.Element => (
  <FormField
    name="password"
    id="password"
    type="password"
    label="Choose Password"
    placeholder="••••••••"
    passwordToggle={passwordToggle}
  />
);

const RememberMeCheckbox = (): JSX.Element => {
  const [field] = useField<boolean>("rememberMe");

  return (
    <FormControl>
      <Checkbox
        colorScheme="blue"
        onChange={field.onChange}
        isChecked={field.value}
        name="rememberMe"
      >
        Remember me?
      </Checkbox>
    </FormControl>
  );
};

export {
  EmailField,
  UsernameField,
  PasswordField,
  ChoosePasswordField,
  RememberMeCheckbox
};
