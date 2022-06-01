import { Button, Flex } from "@chakra-ui/react";
import { BasicNavBar } from "@ibcarr/ui";
import NextLink from "next/link";

const NavBar = (): JSX.Element => {
  return (
    <BasicNavBar heading="Games">
      <Flex
        flex={1}
        columnGap={[1, 2]}
        alignSelf="stretch"
        align="center"
        justify="start"
        flexWrap="wrap"
      >
        <NextLink passHref href="/">
          <Button shadow="md" variant="solid">
            Home
          </Button>
        </NextLink>
      </Flex>
    </BasicNavBar>
  );
};

export default NavBar;
