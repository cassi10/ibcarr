import { Flex, Button } from "@chakra-ui/react";
import { getIconComponent } from "@ibcarr/ui";
import { Functions, State } from "../hooks/use-werdle-game";

type KeyboardProperties = {
  onKeyPress: (key: string) => void;
} & Pick<State, "usedKeys"> &
  Pick<Functions, "getLetterColorScheme">;

const Keyboard = ({
  onKeyPress,
  usedKeys,
  getLetterColorScheme
}: KeyboardProperties): JSX.Element => {
  const keyboardKeys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
  ];

  const renderKey = (key: string): string | JSX.Element => {
    if (key === "enter")
      return getIconComponent("enter", {
        boxSize: 5
      });

    if (key === "backspace")
      return getIconComponent("backspace", {
        boxSize: 5
      });

    return key;
  };

  return (
    <Flex
      display="inline-flex"
      w="full"
      flexDirection="column"
      align="center"
      justify="center"
      rowGap={[0.5, 1, 2]}
      mt={[0, 4]}
    >
      {keyboardKeys.map((row, index) => (
        <Flex
          key={index}
          align="center"
          justify="center"
          columnGap={[0.5, 1, 2]}
          w="full"
        >
          {row.map((key) => {
            const colorScheme = getLetterColorScheme(usedKeys[key]);

            return (
              <Button
                fontSize={["sm", "md"]}
                key={key}
                width={/^[a-z]$/i.test(key) ? [8, 10] : [12, 16]}
                minWidth={3}
                paddingInline={0}
                textTransform="uppercase"
                onClick={(): void => onKeyPress(key)}
                colorScheme={colorScheme}
              >
                {renderKey(key)}
              </Button>
            );
          })}
        </Flex>
      ))}
    </Flex>
  );
};

export default Keyboard;
