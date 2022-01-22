import { Heading, Flex, Button } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { Formik, Form } from "formik";
import Router from "next/router";
import { Dispatch, SetStateAction } from "react";
import { auth } from "../../firebase";
import {
  ChoosePasswordField,
  EmailField,
  PasswordField,
  UsernameField
} from "./form-field";
import { EmailSchema, SignInSchema, SignUpSchema } from "./validation";

type FormButtonProperties = {
  text: string;
  isSubmitting: boolean;
};

const FormButton = ({
  text,
  isSubmitting
}: FormButtonProperties): JSX.Element => (
  <Button
    alignSelf="flex-end"
    colorScheme="blue"
    variant="ghost"
    type="submit"
    isLoading={isSubmitting}
    isDisabled={isSubmitting}
  >
    {text}
  </Button>
);

type EmailFormProperties = {
  setStep: Dispatch<SetStateAction<"enterEmail" | "signIn" | "signUp">>;
};

const EmailForm = ({ setStep }: EmailFormProperties): JSX.Element => (
  <>
    <Heading size="md" alignSelf="flex-start" mb={4}>
      Sign in with Email
    </Heading>
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values, actions): void => {
        fetchSignInMethodsForEmail(auth, values.email)
          .then((methods) =>
            methods.length === 0 ? setStep("signUp") : setStep("signIn")
          )
          .finally(() => {
            actions.setSubmitting(false);
          })
          .catch((error: unknown) => {
            throw new Error(JSON.stringify(error));
          });
      }}
      validationSchema={EmailSchema}
    >
      {({ isSubmitting }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={6}>
            <EmailField />
            <FormButton text="Next" isSubmitting={isSubmitting} />
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

const SignInForm = (): JSX.Element => (
  <>
    <Heading size="md" alignSelf="flex-start" mb={4}>
      Sign in with Email
    </Heading>
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions): void => {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then(() => {
            actions.setSubmitting(false);
            return Router.push("/");
          })
          .catch((error: unknown) => {
            throw new Error(JSON.stringify(error));
          });
      }}
      validationSchema={SignInSchema}
    >
      {({ isSubmitting }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={6}>
            <EmailField />
            <PasswordField />
            <FormButton text="Sign In" isSubmitting={isSubmitting} />
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

const SignUpForm = (): JSX.Element => (
  <>
    <Heading size="md" alignSelf="flex-start" mb={4}>
      Create Account
    </Heading>
    <Formik
      initialValues={{ email: "", username: "", password: "" }}
      onSubmit={({ email, username, password }, actions): void => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (user) => {
            actions.setSubmitting(false);
            try {
              await updateProfile(user.user, { displayName: username });
              return await Router.push("/");
            } catch (error: unknown) {
              throw new Error(JSON.stringify(error));
            }
          })
          .catch((error: unknown) => {
            throw new Error(JSON.stringify(error));
          });
        actions.setSubmitting(false);
      }}
      validationSchema={SignUpSchema}
    >
      {({ isSubmitting }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={6}>
            <EmailField />
            <UsernameField />
            <ChoosePasswordField />
            <FormButton text="Create" isSubmitting={isSubmitting} />
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

export { EmailForm, SignInForm, SignUpForm };
