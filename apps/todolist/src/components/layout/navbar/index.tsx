import { Flex } from "@chakra-ui/react";
import UserMenu from "@components/layout/navbar/user-menu";
import { BasicNavBar } from "@ibcarr/ui";

type NavBarProperties = {
  displayName: string | null;
};

const NavBar = ({ displayName }: NavBarProperties): JSX.Element => {
  return (
    <BasicNavBar heading="TodoList">
      <Flex direction="row" align="center" justify="center">
        <UserMenu displayName={displayName} />
      </Flex>
    </BasicNavBar>
  );
};

export default NavBar;
