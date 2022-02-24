import { Flex, Heading, useColorMode } from "@chakra-ui/react";
import { fromColorMode } from "@ibcarr/ui";
import UserMenu from "@components/layout/navbar/user-menu";

type NavBarProperties = {
  displayName: string | null;
};

const NavBar = ({ displayName }: NavBarProperties): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      align="center"
      justify="space-between"
      direction="row"
      h={14}
      columnGap={6}
      p={2}
      px={4}
      bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
      rounded="md"
      shadow="md"
    >
      <Heading>TodoList</Heading>
      {/* <Flex
        rounded="md"
        flex={1}
        bg={fromColorMode("gray.100", "whiteAlpha.100", colorMode)}
        alignSelf="stretch"
        align="center"
        justify="center"
        shadow="md"
      >
        <Text></Text>
      </Flex> */}
      <Flex direction="row" align="center" justify="center">
        <UserMenu displayName={displayName} />
      </Flex>
    </Flex>
  );
};

export default NavBar;
