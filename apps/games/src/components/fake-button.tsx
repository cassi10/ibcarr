import { Button, ButtonProps } from "@chakra-ui/react";

type FakeButtonProperties = Omit<ButtonProps, "as">;

const FakeButton = (properties: FakeButtonProperties): JSX.Element => {
  const { children } = properties;

  return (
    <Button as="span" cursor="default" _focus={{}} {...properties}>
      {children}
    </Button>
  );
};

export default FakeButton;
