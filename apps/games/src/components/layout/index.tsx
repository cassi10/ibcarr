import { Container, Flex, Box } from "@chakra-ui/react";
import { TopBar } from "@ibcarr/ui";
import NavBar from "./navbar";
import SEO from "./seo";

type LayoutProperties = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProperties): JSX.Element => {
  return (
    <>
      <SEO title="Games" description="Some games made by Isaac Barnes-Carr." />
      <TopBar />
      <Container maxW="container.xl" pb={[1, 4]} paddingInline={[0, 4]}>
        <Flex direction="column" justify="center" align="center">
          <Box w="100%">
            <NavBar />
            <main>{children}</main>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Layout;
