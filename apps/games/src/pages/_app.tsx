import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <ChakraProvider resetCSS>
    <Layout>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

export default App;
