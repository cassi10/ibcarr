import { Flex, useColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";
import { AuthError } from "firebase/auth";
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../../firebase";
import ErrorAlert from "../error-alert";
import { EmailForm, SignInForm, SignUpForm } from "./form-steps";

const AuthForm = (): JSX.Element => {
  const { colorMode } = useColorMode();

  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<AuthError | undefined>(undefined);

  useEffect(() => {
    if (auth.currentUser)
      Router.push("/").catch((error: unknown) => {
        throw new Error(JSON.stringify(error));
      });
  }, []);

  const [step, setStep] = useState<"enterEmail" | "signIn" | "signUp">(
    "enterEmail"
  );

  const initialForm = useMemo(
    () => (
      <EmailForm
        setStep={setStep}
        email={email}
        setEmail={setEmail}
        setFormError={setFormError}
      />
    ),
    [email]
  );

  const [form, setForm] = useState<JSX.Element>(initialForm);

  useEffect(() => {
    switch (step) {
      case "signIn":
        setForm(
          <SignInForm
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            setFormError={setFormError}
          />
        );
        break;
      case "signUp":
        setForm(
          <SignUpForm
            setStep={setStep}
            email={email}
            setEmail={setEmail}
            setFormError={setFormError}
          />
        );
        break;
      default:
        setForm(initialForm);
        break;
    }
  }, [step, email, initialForm]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
      w="sm"
      p={4}
      rounded="md"
      shadow="md"
      rowGap={4}
    >
      {formError !== undefined && (
        <ErrorAlert error={formError} setError={setFormError} compact />
      )}
      {form}
    </Flex>
  );
};

export default AuthForm;
