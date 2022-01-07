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
  Link,
  IconButton
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { getIcon, fromColorMode } from "@ibcarr/ui";
import TodoList from "../components/todo-list";
import TodoForm from "../components/todo-form";
import { auth } from "../firebase/client-app";

const Home: NextPage = () => {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast({
    position: "bottom-left",
    isClosable: true
  });

  // @ts-expect-error - Type 'Persistence' is not assignable to type 'string'.
  const [user, userLoading, userError] = useAuthState(auth);

  if (userError) throw userError;

  useEffect(() => {
    if (!user && !userLoading)
      router.push("/auth").catch((error) => {
        throw error;
      });
  });

  return (
    <>
      <Head>
        <title>TodoList</title>
        <meta name="description" content="A simple todolist!" />
      </Head>
      <Box
        mb={12}
        p={1}
        px={4}
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
      >
        <Flex align="center" direction="row" justify="start">
          <Text>Made by Isaac Barnes-Carr</Text>
          <Icon as={getIcon("dot")} p={0} h={6} w={6} />
          <Icon as={getIcon("github")} mr={1} />
          <Link href="https://github.com/cassi10/" isExternal>
            GitHub
          </Link>
          <Icon as={getIcon("dot")} p={0} h={6} w={6} />
          <Icon as={getIcon("linkedIn")} mr={1} />
          <Link
            href="https://www.linkedin.com/in/isaac-barnes-carr/"
            isExternal
          >
            LinkedIn
          </Link>
          <Icon as={getIcon("dot")} p={0} h={6} w={6} />
          <Icon as={getIcon("games")} mr={1} />
          <Link href="https://games.ibcarr.com" isExternal>
            Games
          </Link>
        </Flex>
      </Box>
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
                    onClick={(): Promise<void> => auth.signOut()} // TODO: Extract to function
                  >
                    Signout
                  </Button>
                </Flex>
              </Flex>
            </Box>
            <TodoForm user={user} toast={toast} colorMode={colorMode} />
            <TodoList colorMode={colorMode} toast={toast} user={user} />
          </Flex>
        )}
      </Container>
    </>
  );
};

export default Home;
