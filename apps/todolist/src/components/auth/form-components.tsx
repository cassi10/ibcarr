import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Heading,
  IconButton
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { AuthError } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { SetStep } from "../../types";

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
  setEmail: Dispatch<SetStateAction<string>>;
  email: string;
};

const BackButton = ({
  setStep,
  setEmail,
  email
}: BackButtonProperties): JSX.Element => {
  const onButtonClick = (): void => {
    setEmail(email);
    setStep("enterEmail");
  };

  return (
    <Button
      colorScheme="gray"
      variant="ghost"
      type="button"
      onClick={onButtonClick}
    >
      Back
    </Button>
  );
};

type FormHeadingProperties = {
  children: string;
};

const FormHeading = ({ children }: FormHeadingProperties): JSX.Element => (
  <Heading size="md" alignSelf="flex-start" my={2}>
    {children}
  </Heading>
);

type ErrorAlertProperties = {
  error: AuthError;
  setError: Dispatch<SetStateAction<AuthError | undefined>>;
};

const ErrorAlert = ({ error, setError }: ErrorAlertProperties): JSX.Element => {
  const closeErrorAlert = (): void => setError(undefined);

  return (
    <Alert
      status="error"
      variant="left-accent"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      p={1}
    >
      <AlertIcon boxSize={6} onClick={closeErrorAlert} />
      <Flex direction="column" w="100%">
        <Accordion allowToggle p={0} mr={2}>
          <AccordionItem border="none" p={0}>
            <AccordionButton
              justifyContent="start"
              alignItems="center"
              columnGap={1}
              p={0}
            >
              <AlertTitle fontSize="md" fontWeight="bold">
                Something went wrong.
              </AlertTitle>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel mt={2} p={0}>
              <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
      <IconButton
        alignSelf="start"
        aria-label="Close Alert"
        variant="ghost"
        size="sm"
        icon={getIconComponent("close")}
        onClick={closeErrorAlert}
      />
    </Alert>
  );
};

export { NextButton, BackButton, FormHeading, ErrorAlert };
