/**
 * TODO Add dropdown to username for logout, settings and toggle cololr mode etc...
 * TODO Pull some of this out into it's own component
 * TODO I could even make my own version of M365 sort of...
 * TODO convert promises to async await try catch blocks
 * TODO should probably change Firestore to hold user data and link it through userid as collection - this will also allow for support with games leaderboards
 */

import {
  Container,
  Box,
  Heading,
  Flex,
  Button,
  useToast,
  useColorMode,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
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
                  rounded="md"
                  flex={1}
                  mx={6}
                  bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
                  alignSelf="stretch"
                  align="center"
                  justify="center"
                  shadow="md"
                >
                  {/* <Text></Text> */}
                </Flex>
                <Flex direction="row" align="center" justify="center">
                  <Menu autoSelect={false} placement="bottom">
                    <MenuButton as={Button} colorScheme="blue" variant="ghost">
                      {user.displayName}
                    </MenuButton>
                    <MenuList minW="min-content">
                      <MenuItem
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        columnGap={2}
                      >
                        <Icon as={getIcon("settings")} />
                        Settings
                      </MenuItem>
                      <MenuItem
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        columnGap={2}
                        onClick={toggleColorMode}
                      >
                        <Icon
                          as={
                            colorMode === "light"
                              ? getIcon("moon")
                              : getIcon("sun")
                          }
                        />
                        Toggle {colorMode === "dark" ? "light" : "dark"} mode
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        columnGap={2}
                        onClick={onSignOutClick}
                      >
                        <Icon as={getIcon("logout")} />
                        Signout
                      </MenuItem>
                    </MenuList>
                  </Menu>
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
