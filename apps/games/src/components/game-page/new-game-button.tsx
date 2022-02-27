import { Button, ButtonProps } from "@chakra-ui/react";

type NewGameButtonProperties = {
  onClick: () => void;
  text: string;
  button?: ButtonProps;
};

const NewGameButton = ({
  onClick,
  text,
  button
}: NewGameButtonProperties): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button size="sm" onClick={onClick} colorScheme="purple" {...button}>
    {text}
  </Button>
);

export default NewGameButton;
