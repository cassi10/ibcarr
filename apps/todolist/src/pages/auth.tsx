import { NextPage } from "next";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Props } from "react-firebaseui";
import { Grid } from "@chakra-ui/react";
import Head from "next/head";
import { auth, providers } from "../firebase/client-app";

const uiConfig: Props["uiConfig"] = {
  signInSuccessUrl: "/",
  signInOptions: [...providers]
};

const Home: NextPage = () => (
  <>
    <Head>
      <title>TodoList - Auth</title>
      <meta name="description" content="A simple todolist!" />
    </Head>
    <Grid
      gridTemplateColumns="1fr"
      gridTemplateRows="1fr"
      alignItems="center"
      justifyContent="center"
      h="100vh"
    >
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </Grid>
  </>
);

export default Home;
