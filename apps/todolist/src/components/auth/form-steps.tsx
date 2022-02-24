import { Flex } from "@chakra-ui/react";
import {
  AuthError,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  setPersistence,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { Formik, Form } from "formik";
import Router from "next/router";
import { Dispatch, SetStateAction } from "react";
import { auth } from "@firebase";
import { SetStep } from "@types";
import {
  BackButton,
  FormHeading,
  NextButton
} from "@components/auth/components";
import {
  EmailSchema,
  SignInSchema,
  SignUpSchema
} from "@components/auth/validation";
import {
  ChoosePasswordField,
  EmailField,
  PasswordField,
  RememberMeCheckbox,
  UsernameField
} from "@components/auth/form-field";

type FormStepProperties = {
  setStep: SetStep;
  email: string;
  setFormError: Dispatch<SetStateAction<AuthError | undefined>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailForm = ({
  setStep,
  email,
  setFormError,
  setEmail
}: FormStepProperties): JSX.Element => (
  <>
    <FormHeading>Sign In</FormHeading>
    <Formik
      initialValues={{ email }}
      onSubmit={async (values, actions): Promise<void> => {
        setEmail(values.email);
        try {
          const methods = await fetchSignInMethodsForEmail(auth, values.email);
          if (methods.length === 0) {
            setStep("signUp");
          } else setStep("signIn");
        } catch (error: unknown) {
          if ((error as AuthError).code === "auth/invalid-email") {
            actions.setFieldError("email", "Invalid email.");
          } else setFormError(error as AuthError);
        }
        actions.setSubmitting(false);
      }}
      validationSchema={EmailSchema}
    >
      {({ isSubmitting, isValid }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={5}>
            <EmailField autoFocus />
            <NextButton isSubmitting={isSubmitting} isValid={isValid}>
              Next
            </NextButton>
          </Flex>
        </Form>
      )}
    </Formik>
  </>
);

const SignInForm = ({
  setStep,
  email,
  setFormError,
  setEmail
}: FormStepProperties): JSX.Element => (
  <>
    <FormHeading>Sign In</FormHeading>
    <Formik
      initialValues={{ email, password: "", rememberMe: true }}
      onSubmit={async (values, actions): Promise<void> => {
        try {
          const persistence = values.rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence;

          await setPersistence(auth, persistence);
          await signInWithEmailAndPassword(auth, values.email, values.password);

          actions.setSubmitting(false);

          await Router.push("/");
        } catch (error: unknown) {
          actions.setSubmitting(false);
          if ((error as AuthError).code === "auth/wrong-password") {
            actions.setFieldError(
              "password",
              "The email and password you entered don't match."
            );
          } else if ((error as AuthError).code === "auth/invalid-email") {
            actions.setFieldError("email", "Invalid email.");
          } else setFormError(error as AuthError);
        }
      }}
      validationSchema={SignInSchema}
    >
      {({ isSubmitting, isValid, values }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={5} align="stretch" justify="center">
            <EmailField helperText setStep={setStep} />
            <PasswordField passwordToggle autoFocus />
            <Flex
              direction="row"
              justify="flex-end"
              align="center"
              columnGap={2}
            >
              <RememberMeCheckbox />
              <BackButton
                setStep={setStep}
                setEmail={setEmail}
                email={values.email}
              />
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

const SignUpForm = ({
  setStep,
  email,
  setFormError,
  setEmail
}: FormStepProperties): JSX.Element => (
  <>
    <FormHeading>Create Account</FormHeading>
    <Formik
      initialValues={{ email, username: "", password: "", rememberMe: true }}
      onSubmit={async (values, actions): Promise<void> => {
        try {
          const persistence = values.rememberMe
            ? browserLocalPersistence
            : browserSessionPersistence;

          await setPersistence(auth, persistence);

          const user = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          await updateProfile(user.user, { displayName: values.username });

          actions.setSubmitting(false);

          await Router.push("/");
        } catch (error: unknown) {
          actions.setSubmitting(false);
          if ((error as AuthError).code === "auth/invalid-email") {
            actions.setFieldError("email", "Invalid email.");
          } else if (
            (error as AuthError).code === "auth/email-already-in-use"
          ) {
            actions.setFieldError("email", "That email is already in use.");
          } else setFormError(error as AuthError);
        }
      }}
      validationSchema={SignUpSchema}
    >
      {({ isSubmitting, isValid, values }): JSX.Element => (
        <Form style={{ width: "100%" }} noValidate>
          <Flex direction="column" rowGap={5} align="stretch" justify="center">
            <EmailField helperText setStep={setStep} />
            <UsernameField autoFocus />
            <ChoosePasswordField passwordToggle />
            <Flex
              direction="row"
              justify="flex-end"
              align="center"
              columnGap={2}
            >
              <RememberMeCheckbox />
              <BackButton
                setStep={setStep}
                setEmail={setEmail}
                email={values.email}
              />
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
