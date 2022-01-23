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
import { type SetStep } from "./form";
import {
  ChoosePasswordField,
  EmailField,
  PasswordField,
  UsernameField
} from "./form-field";
import { EmailSchema, SignInSchema, SignUpSchema } from "./validation";

type NextButtonProperties = {
  children: string;
  isSubmitting: boolean;
  isValid: boolean;
};

const NextButton = ({
  children,
  isSubmitting,
  isValid
}: NextButtonProperties): JSX.Element => (
  <Button
    colorScheme="blue"
    variant="solid"
    type="submit"
    isLoading={isSubmitting}
    isDisabled={isSubmitting || !isValid}
  >
    {children}
  </Button>
);

type BackButtonProperties = {
  setStep: SetStep;
};

const BackButton = ({ setStep }: BackButtonProperties): JSX.Element => (
  <Button
    colorScheme="gray"
    variant="ghost"
    type="button"
    onClick={(): void => setStep("enterEmail")}
  >
    Back
  </Button>
);

type FormHeadingProperties = {
  children: string;
};

const FormHeading = ({ children }: FormHeadingProperties): JSX.Element => (
  <Heading size="md" alignSelf="flex-start" mb={4}>
    {children}
  </Heading>
);

type FormStepProperties = {
  setStep: SetStep;
  email: string;
};

type EmailFormProperties = FormStepProperties & {
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailForm = ({
  setStep,
  email,
  setEmail
}: EmailFormProperties): JSX.Element => (
  <>
    <FormHeading>Sign in with Email</FormHeading>
    <Formik
      initialValues={{ email }}
      onSubmit={(values, actions): void => {
        setEmail(values.email);
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
      {({ isSubmitting, isValid }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={5}>
            <EmailField />
            <NextButton isSubmitting={isSubmitting} isValid={isValid}>
              Next
            </NextButton>
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

const SignInForm = ({ setStep, email }: FormStepProperties): JSX.Element => (
  <>
    <FormHeading>Sign in with Email</FormHeading>
    <Formik
      initialValues={{ email, password: "" }}
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
      {({ isSubmitting, isValid }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={5} align="stretch" justify="center">
            <EmailField disabled helperText setStep={setStep} />
            <PasswordField />
            <Flex direction="row" justify="flex-end" columnGap={2}>
              <BackButton setStep={setStep} />
              <NextButton isSubmitting={isSubmitting} isValid={isValid}>
                Sign In
              </NextButton>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

const SignUpForm = ({ setStep, email }: FormStepProperties): JSX.Element => (
  <>
    <FormHeading>Create Account</FormHeading>
    <Formik
      initialValues={{ email, username: "", password: "" }}
      onSubmit={(values, actions): void => {
        createUserWithEmailAndPassword(auth, email, values.password)
          .then(async (user) => {
            actions.setSubmitting(false);
            try {
              await updateProfile(user.user, { displayName: values.username });
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
      {({ isSubmitting, isValid }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={5} align="stretch" justify="center">
            <EmailField disabled helperText setStep={setStep} />
            <UsernameField />
            <ChoosePasswordField />
            <Flex direction="row" justify="flex-end" columnGap={2}>
              <BackButton setStep={setStep} />
              <NextButton isSubmitting={isSubmitting} isValid={isValid}>
                Save
              </NextButton>
            </Flex>
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

export { EmailForm, SignInForm, SignUpForm };
