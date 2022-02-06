import { ThemeConfig, extendTheme, ColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false
};

const theme = extendTheme({ config });

const scrollbar = (
  colorMode: ColorMode
): {
  "&::-webkit-scrollbar": {
    width: string;
    borderRadius: string;
    backgroundColor: string | string[];
  };
  "&::-webkit-scrollbar-thumb": {
    borderRadius: string;
    backgroundColor: string | string[];
  };
} => {
  return {
    "&::-webkit-scrollbar": {
      width: "0.5rem",
      borderRadius: "0.5rem",
      backgroundColor: fromColorMode(
        `rgba(0, 0, 0, 0.15)`,
        `rgba(255, 255, 255, 0.1)`,
        colorMode
      )
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "0.5rem",
      backgroundColor: fromColorMode(
        `rgba(0, 0, 0, 0.15)`,
        `rgba(255, 255, 255, 0.1)`,
        colorMode
      )
    }
  };
};

const { initialColorMode } = config;

export { initialColorMode, scrollbar };
export default theme;
