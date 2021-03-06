import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import { colors } from "@ibcarr/utils";
import type { Game } from "@types";

type GameLinkProperties = {
  game: Game;
  index: number;
};

const GameLink = ({ game, index }: GameLinkProperties): JSX.Element => {
  const [color, setColor] = useState<string>("gray");

  useEffect(() => {
    const chosenColor = colors[index % colors.length];

    setColor(chosenColor);
  }, [index]);

  const buttonSize = useBreakpointValue({ base: "sm", sm: "md" });
  const buttonFontSize = useBreakpointValue({ base: "md", sm: "md" });

  return (
    <NextLink passHref href={game.href} key={game.name}>
      <Button
        shadow="md"
        variant="solid"
        colorScheme={color}
        disabled={game.disabled}
        size={buttonSize}
        fontSize={buttonFontSize}
      >
        {game.name}
      </Button>
    </NextLink>
  );
};

export default GameLink;
