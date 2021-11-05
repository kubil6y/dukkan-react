import React from "react";
import { FC } from "react";
import { useIsLargeScreen } from "../../app/hooks/useIsLargeScreen";
import { useRecoilState, useRecoilValue } from "recoil";
import { userMenuState } from "../../../recoil/atoms";
import { UserMenuHeader } from "./UserMenuHeader";
import { UserMenuItem } from "./UserMenuItem";
import { userInfoState } from "../../../recoil/selectors";
import { useUser } from "../../../auth/useUser";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { USER_TOKEN } from "../../../constants";

const loggedInMenuItems = [
  { id: 1, text: "Profile", to: "/me" },
  { id: 2, text: "Edit Profile", to: "/me/edit" },
  { id: 3, text: "My Orders", to: "/my-orders" },
];

//{ id: 4, text: "Verify Acccount", to: "/verify-account" },

export const UserMenu: FC = () => {
  const { user, clearUser } = useUser();
  const { isLoggedIn, isActivated } = useRecoilValue(userInfoState);
  const history = useHistory();

  const [isOpen, setIsOpen] = useRecoilState(userMenuState);
  const btnRef = React.useRef();

  const isLargeScreen = useIsLargeScreen();
  const size = isLargeScreen ? "xs" : "full";

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN);
    clearUser();
  };

  const onClose = () => setIsOpen(false);
  return (
    <Drawer
      size={size}
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef.current}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color="white" />
        <UserMenuHeader />

        {isLoggedIn && user ? (
          <>
            <Text fontSize="24px" fontWeight="bold" pl="36px" py="13px">
              User
            </Text>
            <Divider />
            <DrawerBody p="0">
              {loggedInMenuItems.map(({ id, text, to }) => (
                <UserMenuItem text={text} to={to} key={id} />
              ))}
              {!isActivated && (
                <UserMenuItem text="Verify Account" to="/verify-account" />
              )}
            </DrawerBody>
          </>
        ) : (
          <DrawerBody></DrawerBody>
        )}

        <DrawerFooter>
          {isLoggedIn ? (
            <Button
              colorScheme="red"
              width="100%"
              variant="outline"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              colorScheme="facebook"
              width="100%"
              onClick={() => {
                setIsOpen(false);
                history.push("/register");
              }}
            >
              Register
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
