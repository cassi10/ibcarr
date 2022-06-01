import { Button, ButtonProps, useBreakpointValue } from "@chakra-ui/react";

type NewGameButtonProperties = ButtonProps;

const NewGameButton = (properties: NewGameButtonProperties): JSX.Element => {
  const buttonSize = useBreakpointValue({
    base: "xs",
    sm: "sm"
  });

  return (
    <Button size={buttonSize} colorScheme="purple" {...properties}>
      New Game
    </Button>
  );
};

export default NewGameButton;
