import { ColorMode } from "@chakra-ui/react";

const fromColorMode = (
  ifLight: string | string[],
  ifDark: string | string[],
  colorMode: ColorMode
): string | string[] => (colorMode === "light" ? ifLight : ifDark);

export default fromColorMode;
