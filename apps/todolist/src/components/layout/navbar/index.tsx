import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";
import UserMenu from "./user-menu";

type NavBarProperties = {
  displayName: string | null;
};

const NavBar = ({ displayName }: NavBarProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Flex align="center" justify="center" direction="row" h={10} columnGap={6}>
      <Heading h={10}>TodoList</Heading>
      <Flex
        rounded="md"
        flex={1}
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        alignSelf="stretch"
        align="center"
        justify="center"
        shadow="md"
      >
        {/* <Text></Text> */}
      </Flex>
      <Flex direction="row" align="center" justify="center">
        <UserMenu displayName={displayName} />
      </Flex>
    </Flex>
  );
};

export default NavBar;
