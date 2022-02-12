import {
  Alert,
  AlertIcon,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AlertTitle,
  AccordionIcon,
  AccordionPanel,
  AlertDescription,
  IconButton
} from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

type ErrorAlertProperties = {
  error: AuthError | FirebaseError | undefined;
  setError?: Dispatch<SetStateAction<AuthError | undefined>>;
  compact?: boolean;
  title?: string;
};

const ErrorAlert = ({
  error,
  setError,
  compact = false,
  title = "Something went wrong."
}: ErrorAlertProperties): JSX.Element => (
  <Alert
    status="error"
    variant="left-accent"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    p={compact ? 1 : 6}
  >
    <AlertIcon boxSize={compact ? 6 : 8} />
    <Flex direction="column" w="100%">
      {error ? (
        <Accordion allowToggle p={0} mr={2}>
          <AccordionItem border="none" p={0}>
            <AccordionButton
              justifyContent="start"
              alignItems="center"
              columnGap={1}
              p={0}
            >
              <AlertTitle fontSize={compact ? "md" : "lg"} fontWeight="bold">
                {title}
              </AlertTitle>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel mt={2} p={0}>
              <AlertDescription maxWidth="sm">{error.message}</AlertDescription>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <AlertTitle fontSize={compact ? "md" : "lg"} fontWeight="bold">
          {title}
        </AlertTitle>
      )}
    </Flex>
    {setError && (
      <IconButton
        alignSelf="start"
        aria-label="Close Alert"
        variant="ghost"
        size="sm"
        icon={getIconComponent("close")}
        onClick={(): void => setError(undefined)}
      />
    )}
  </Alert>
);

export default ErrorAlert;
