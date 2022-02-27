import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "@theme";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS theme={theme}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
