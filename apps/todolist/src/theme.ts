import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false
};

const theme = extendTheme({ config });

const { initialColorMode } = config;

export { initialColorMode };
export default theme;
