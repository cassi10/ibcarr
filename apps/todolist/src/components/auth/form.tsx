/**
 * ! https://github.com/cure53/DOMPurify
 * ! https://firebase.google.com/docs/reference/js/auth.md#fetchsigninmethodsforemail
 *   .test("email-in-use", "That email us already in use", (value) => fetchSignInMethodsForEmail(value) === null)
 *
 * TODO If logged in route away from /auth
 * TODO Work out how to link Formik, Yup and ChakraUI without making styling hell to deal with
 * TODO Add "Remember Me" checkbox to form to switch between `local` persistense and `session` persistence
 * TODO Start using new FormData() to make life easier when dealing with form data
 * TODO persist `email` accross forms
 * TODO on signIn or signUp steps
 *        add `Back` button to go back to enterEmail form
 *        either disable email input
 *          add HelperText underneath saying `Not your email? Start again<link to enterEmail form>
 *        or
 *          add check to see if email is already in use
 */

import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { EmailForm, SignInForm, SignUpForm } from "./form-steps";

const AuthForm: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser)
      router.push("/").catch((error: unknown) => {
        throw new Error(JSON.stringify(error));
      });
  });

  const [step, setStep] = useState<"enterEmail" | "signIn" | "signUp">(
    "enterEmail"
  );
  const [form, setForm] = useState<JSX.Element>(
    <EmailForm setStep={setStep} />
  );

  useEffect(() => {
    switch (step) {
      case "signIn":
        setForm(<SignInForm />);
        break;
      case "signUp":
        setForm(<SignUpForm />);
        break;
      default:
        setForm(<EmailForm setStep={setStep} />);
        break;
    }
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

export default AuthForm;
