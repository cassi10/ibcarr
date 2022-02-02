import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.push("/hangman").catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  }, [router]);

  return (
    <Head>
      <title>Games</title>
      <meta name="description" content="Games." />
    </Head>
  );
};

export default Home;
