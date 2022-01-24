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
  Heading
} from "@chakra-ui/react";
import { AuthError } from "firebase/auth";
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
  <Heading size="md" alignSelf="flex-start" my={2}>
    {children}
  </Heading>
);

type ErrorAlertProperties = {
  error: AuthError;
};

const ErrorAlert = ({ error }: ErrorAlertProperties): JSX.Element => (
  <Alert
    status="error"
    variant="left-accent"
    flexDirection="row"
    alignItems="start"
    justifyContent="start"
  >
    <AlertIcon boxSize={6} />
    <Flex direction="column" w="100%">
      <Accordion allowToggle p={0}>
        <AccordionItem border="none" p={0}>
          <AccordionButton justifyContent="space-between" p={0}>
            <AlertTitle fontSize="md" fontWeight="bold">
              Something went wrong...
            </AlertTitle>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel mt={2} p={0}>
            <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  </Alert>
);

export { NextButton, BackButton, FormHeading, ErrorAlert };
