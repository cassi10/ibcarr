import { Button } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { SetStep } from "@types";

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

export { NextButton, BackButton };
