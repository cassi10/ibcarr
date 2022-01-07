import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/hangman").catch((error) => {
      throw error;
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
