import Head from "next/head";

type SEOProperties = {
  title: string;
  description: string;
};

const SEO = ({ title, description }: SEOProperties): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} key="title" />
      <meta name="description" content={description} key="description" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
    </Head>
  );
};

export default SEO;
