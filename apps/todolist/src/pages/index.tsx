/**
 * TODO Add dropdown to username for logout and settings etc...
 * TODO Pull some of this out into it's own component
 */

import {
  Container,
  Text,
  Box,
  Heading,
  Flex,
  Button,
  useToast,
  useColorMode,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";
import { getIcon, fromColorMode, TopBar } from "@ibcarr/ui";
import { useRouter } from "next/router";
import TodoList from "../components/todo-list";
import TodoForm from "../components/todo-form";
import { auth } from "../firebase";

const Home = (): JSX.Element => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast({
    position: "top",
    isClosable: true,
    variant: "solid"
  });

  const [user, userLoading, userError] = useAuthState(auth);

  if (userError) throw userError;

  useEffect(() => {
    if (!user && !userLoading)
      router.push("/auth").catch((error: unknown) => {
        throw new Error(JSON.stringify(error));
      });
  }, [router, user, userLoading]);

  const onSignOutClick = (): void => {
    auth.signOut().catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  return (
    <>
      <Head>
        <title>TodoList</title>
        <meta name="description" content="A simple todolist!" />
      </Head>
      <TopBar />
      <Container maxW="8xl" pb={4}>
        {user && (
          <Flex flexDirection="column" justify="center">
            <Box>
              <Flex align="center" justify="center" direction="row" h={10}>
                <Heading h={10}>TodoList</Heading>
                <Flex
                  rounded={8}
                  flex={1}
                  mx={6}
                  bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
                  alignSelf="stretch"
                  align="center"
                  justify="center"
                  boxShadow="md"
                >
                  {/* <Text></Text> */}
                </Flex>
                <Flex
                  direction="row"
                  align="center"
                  justify="center"
                  gridGap={2}
                >
                  <IconButton
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
                  <Text fontSize="lg" px={1}>
                    {user.displayName}
                  </Text>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    onClick={onSignOutClick}
                  >
                    Signout
                  </Button>
                </Flex>
              </Flex>
            </Box>
            <TodoForm user={user} toast={toast} />
            <TodoList toast={toast} user={user} />
          </Flex>
        )}
      </Container>
    </>
  );
};

export default Home;
