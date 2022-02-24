import { Grid, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { getIcon } from "@ibcarr/ui";
import Head from "next/head";
import AuthForm from "@components/auth/form";

const Auth = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>TodoList - Auth</title>
        <meta name="description" content="A simple todolist!" />
      </Head>
      <Grid placeItems="center" h="100vh">
        <IconButton
          position="absolute"
          top={2}
          right={2}
          alignSelf="start"
          justifySelf="end"
          aria-label="Toggle color mode"
          variant="ghost"
          onClick={toggleColorMode}
          icon={
            colorMode === "light" ? (
              <Icon as={getIcon("moon")} />
            ) : (
              <Icon as={getIcon("sun")} />
            )
          }
        />
        <AuthForm />
      </Grid>
    </>
  );
};

export default Auth;
