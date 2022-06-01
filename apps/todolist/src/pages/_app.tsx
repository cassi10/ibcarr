import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "@theme";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS theme={theme}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
