import {
  useColorMode,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  MenuDivider
} from "@chakra-ui/react";
import { getIcon, type IconsType } from "@ibcarr/ui";
import { MouseEventHandler } from "react";
import { auth } from "../../../firebase";

type UserMenuItemProperties = {
  children: string | string[];
  icon: IconsType;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const UserMenuItem = ({
  children,
  icon,
  onClick
}: UserMenuItemProperties): JSX.Element => (
  <MenuItem
    display="flex"
    alignItems="center"
    justifyContent="flex-start"
    columnGap={2}
    onClick={onClick}
  >
    <Icon as={getIcon(icon)} />
    {children}
  </MenuItem>
);

type UserMenuProperties = {
  displayName: string | null;
};

const UserMenu = ({ displayName }: UserMenuProperties): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  const onSignOutClick = (): void => {
    auth.signOut().catch((error: unknown) => {
      throw new Error(JSON.stringify(error));
    });
  };

  return (
    <Menu autoSelect={false} placement="bottom">
      <MenuButton as={Button} colorScheme="blue" variant="ghost">
        {displayName}
      </MenuButton>
      <MenuList minW="min-content">
        <UserMenuItem icon="settings">Settings</UserMenuItem>
        <UserMenuItem
          icon={colorMode === "light" ? "moon" : "sun"}
          onClick={toggleColorMode}
        >
          Toggle {colorMode === "dark" ? "light" : "dark"} mode
        </UserMenuItem>
        <MenuDivider />
        <UserMenuItem icon="logout" onClick={onSignOutClick}>
          Sign Out
        </UserMenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
