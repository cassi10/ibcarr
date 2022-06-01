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
import { deleteUser, signOut } from "firebase/auth";
import { MouseEventHandler } from "react";
import { auth } from "@firebase";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const onSignOutClick = (): void => {
    signOut(auth)
      .then(() => {
        return router.push("/auth");
      })
      .catch((error) => {
        throw error;
      });
  };

  const onDeleteUserClick = (): void => {
    const user = auth.currentUser;
    if (!user) return;
    deleteUser(user)
      .then(() => {
        return router.push("/auth");
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <Menu autoSelect={false} placement="bottom">
      <MenuButton as={Button} colorScheme="blue" variant="ghost">
        {displayName}
      </MenuButton>
      <MenuList minW="min-content">
        {/* <UserMenuItem icon="settings">Settings</UserMenuItem> */}
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
        {process.env.NODE_ENV === "development" && (
          <UserMenuItem icon="close" onClick={onDeleteUserClick}>
            Delete
          </UserMenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
