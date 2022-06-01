import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Layout } from "@components";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
