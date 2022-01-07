import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/shared/lib/router/router";
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
