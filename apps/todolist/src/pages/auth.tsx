import { Grid, Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { getIcon } from "@ibcarr/ui";
import AuthForm from "@components/auth/form";
import SEO from "@components/layout/seo";

const Auth = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <SEO />
      <Grid placeItems="center" h="100vh">
        <IconButton
          position="absolute"
          top={2}
          right={2}
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
