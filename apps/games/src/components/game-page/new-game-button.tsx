import { Button } from "@chakra-ui/react";

type NewGameButtonProperties = {
  onClick: () => void;
  text: string;
};

const NewGameButton = ({
  onClick,
  text
}: NewGameButtonProperties): JSX.Element => (
  <Button size="sm" onClick={onClick} colorScheme="purple">
    {text}
  </Button>
);

export default NewGameButton;
