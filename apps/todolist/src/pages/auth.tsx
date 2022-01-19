import { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import Head from "next/head";
import AuthForm from "../components/auth/form";

// TODO https://codesandbox.io/s/multistep-auth-form-v5nwn

const Auth: NextPage = () => {
  return (
    <>
      <Head>
        <title>TodoList - Auth</title>
        <meta name="description" content="A simple todolist!" />
      </Head>
      <Grid placeItems="center" h="100vh">
        <AuthForm />
      </Grid>
    </>
  );
};

export default Auth;
