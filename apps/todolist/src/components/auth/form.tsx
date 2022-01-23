/**
 * TODO Add "Remember Me" checkbox to form to switch between `local` persistense and `session` persistence
 */

import { Flex } from "@chakra-ui/react";
import Router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { EmailForm, SignInForm, SignUpForm } from "./form-steps";

const AuthForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (auth.currentUser)
      Router.push("/").catch((error: unknown) => {
        throw new Error(JSON.stringify(error));
      });
  }, []);

  const [step, setStep] = useState<"enterEmail" | "signIn" | "signUp">(
    "enterEmail"
  );

  const [form, setForm] = useState<JSX.Element>(
    <EmailForm setStep={setStep} email={email} setEmail={setEmail} />
  );

  useEffect(() => {
    switch (step) {
      case "signIn":
        setForm(<SignInForm setStep={setStep} email={email} />);
        break;
      case "signUp":
        setForm(<SignUpForm setStep={setStep} email={email} />);
        break;
      default:
        setForm(
          <EmailForm setStep={setStep} email={email} setEmail={setEmail} />
        );
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bg="gray.900"
      w="sm"
      p={6}
      rounded="sm"
      shadow="md"
      rowGap={6}
    >
      {form}
    </Flex>
  );
};

export type SetStep = Dispatch<
  SetStateAction<"enterEmail" | "signIn" | "signUp">
>;
export default AuthForm;
