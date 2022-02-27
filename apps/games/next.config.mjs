// @ts-check

/**
 * @type {import("next").NextConfig}
 * */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hangman",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
