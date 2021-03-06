import { Container, Flex, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";
import { TopBar } from "@ibcarr/ui";
import { useRouter } from "next/router";
import NavBar from "@components/layout/navbar";
import { auth } from "@firebase";
import { TodoList, TodoForm } from "@components/todo";

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
              <TodoList user={user} toast={toast} />
            </Container>
          </Flex>
        )}
      </Container>
    </>
  );
};

export default Home;
