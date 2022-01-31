/**
 * TODO Add dropdown to username for logout, settings and toggle cololr mode etc...
 * TODO Pull some of this out into it's own component
 * TODO I could even make my own version of M365 sort of...
 * TODO convert promises to async await try catch blocks
 * TODO should probably change Firestore to hold user data and link it through userid as collection - this will also allow for support with games leaderboards
 */

import { Container, Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";
import { TopBar } from "@ibcarr/ui";
import { useRouter } from "next/router";
import TodoList from "../components/todo-list";
import TodoForm from "../components/todo-form";
import { auth } from "../firebase";
import NavBar from "../components/layout/navbar";

const Home = (): JSX.Element => {
  const router = useRouter();

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
            <NavBar displayName={user.displayName} />
            <Container maxW="6xl">
              <TodoForm user={user} toast={toast} />
              <TodoList toast={toast} user={user} />
            </Container>
          </Flex>
        )}
      </Container>
    </>
  );
};

export default Home;
