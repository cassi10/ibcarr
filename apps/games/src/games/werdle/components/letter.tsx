import { ButtonProps } from "@chakra-ui/react";
import { FakeButton } from "@components";
import { ReactNode } from "react";

type LetterProperties = {
  children: ReactNode;
  small?: boolean;
} & Pick<ButtonProps, "size" | "colorScheme" | "variant">;

const Letter = ({
  children,
  size,
  colorScheme,
  variant,
  small = false
}: LetterProperties): JSX.Element => (
  <FakeButton
    size={size}
    width={small ? 10 : [10, 12]}
    minWidth={0}
    paddingInline={0}
    textTransform="uppercase"
    colorScheme={colorScheme}
    variant={variant}
  >
    {children}
  </FakeButton>
);

export default Letter;
