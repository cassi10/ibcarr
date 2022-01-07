import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Button, useBreakpointValue } from "@chakra-ui/react";
import { Game } from "../types";

interface IGameLink {
  game: Game;
  index: number;
}

const GameLink: React.FC<IGameLink> = ({ game, index }) => {
  const [color, setColor] = useState<string>("gray");

  useEffect(() => {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "cyan",
      "blue",
      "purple",
      "pink"
    ];

    const chosenColor = colors[index % colors.length];

    setColor(chosenColor);
  }, [index]);

  const buttonSize = useBreakpointValue({ base: "sm", sm: "md" });
  const buttonFontSize = useBreakpointValue({ base: "md", sm: "md" });

  return (
    <NextLink href={game.href} key={game.name}>
      <Button
        boxShadow="md"
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
