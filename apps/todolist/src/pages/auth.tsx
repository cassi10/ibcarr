import { NextPage } from "next";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input
} from "@chakra-ui/react";
import Head from "next/head";
import { ChangeEvent, useState } from "react";

/**
 * ! https://github.com/cure53/DOMPurify
 * ! https://firebase.google.com/docs/reference/js/auth.md#fetchsigninmethodsforemail
 *   .test("email-in-use", "That email us already in use", (value) => fetchSignInMethodsForEmail(value) === null)
 * TODO: If logged in route away from /auth
 * TODO: Work out how to link Formik, Yup and ChakraUI without making styling hell to deal with
 *
 * On `Next` button click check if user exists
 *   if yes
 *    show password box and change button to sign in
 *   if no
 *    show username box and choose password box and change button to save
 */

const Auth: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void =>
    setEmail(event.target.value);

  // const [password, setPassword] = useState<string>("");
  // const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void =>
  //   setPassword(event.target.value);

  // const onSignInClick = (): void => {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       return router.push("/");
  //     })
  //     .catch(({ code }: { code: string }) => {
  //       throw new Error(code);
  //     });
  // };

  return (
    <>
      <Head>
        <title>TodoList - Auth</title>
        <meta name="description" content="A simple todolist!" />
      </Head>
      <Grid
        gridTemplateColumns="1fr"
        gridTemplateRows="1fr"
        justifyItems="center"
        alignItems="center"
        h="100vh"
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          w="sm"
          bg="gray.900"
          p={4}
          rounded="sm"
          shadow="md"
          rowGap={6}
        >
          <Heading size="md" alignSelf="flex-start" mb={4}>
            Sign in with email
          </Heading>
          <FormControl>
            <FormLabel htmlFor="email" colorScheme="gray" fontSize="sm" m={0}>
              Email address
            </FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              variant="flushed"
            />
          </FormControl>
          <Button
            alignSelf="flex-end"
            colorScheme="blue"
            variant="ghost"
            type="submit"
          >
            Next
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

export default Auth;
