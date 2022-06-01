import { Flex, Button } from "@chakra-ui/react";
import { Functions, State } from "../hooks/use-hangman-game";

type KeyboardProperties = Pick<State, "isPlaying"> &
  Pick<Functions, "hasLetterBeenGuessed" | "handleKeyboardLetterClick">;

const Keyboard = ({
  isPlaying,
  hasLetterBeenGuessed,
  handleKeyboardLetterClick
}: KeyboardProperties): JSX.Element => {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  return (
    <Flex
      display="inline-flex"
      w="full"
      flexDirection="column"
      align="center"
      justify="center"
      rowGap={[1, 2]}
      mt={[0, 4]}
    >
      {keyboard.map((row, index) => (
        <Flex
          key={index}
          align="center"
          justify="center"
          columnGap={[1, 2]}
          w="full"
        >
          {row.map((key) => (
            <Button
              fontSize={["sm", "md"]}
              key={key}
              width={/^[a-z]$/i.test(key) ? [8, 10] : [12, 16]}
              minWidth={3}
              paddingInline={0}
              textTransform="uppercase"
              disabled={!isPlaying || hasLetterBeenGuessed(key)}
              onClick={(): void => handleKeyboardLetterClick(key)}
            >
              {key}
            </Button>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export default Keyboard;
