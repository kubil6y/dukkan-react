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
import React from "react";
import { FC } from "react";
import { useMyMediaQueries, useUser } from "../../app/hooks";
import { useRecoilState } from "recoil";
import { userMenuState } from "../../../recoil/atoms";
import { UserMenuHeader } from "./UserMenuHeader";
import { UserMenuItem } from "./UserMenuItem";
import { useHistory } from "react-router-dom";
import { USER_TOKEN } from "../../../constants";

const loggedInMenuUserItems = [
  { id: 1, text: "Profile", to: "/me" },
  { id: 2, text: "Edit Profile", to: "/me/edit" },
];

const loggedInMenuOrderItems = [
  { id: 10, text: "My Orders", to: "/my-orders" },
];

export const UserMenu: FC = () => {
  const { user } = useUser();
  const history = useHistory();

  const [isOpen, setIsOpen] = useRecoilState(userMenuState);
  const btnRef = React.useRef();

  const { isLargeScreen } = useMyMediaQueries();
  const size = isLargeScreen ? "xs" : "full";

  const handleLogout = () => {
    localStorage.removeItem(USER_TOKEN);
    history.goBack();
    window.location.reload();
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

        {user ? (
          <>
            <Text fontSize="24px" fontWeight="bold" pl="36px" py="13px">
              User
            </Text>
            <Divider />
            <DrawerBody p="0">
              {loggedInMenuUserItems.map(({ id, text, to }) => (
                <UserMenuItem text={text} to={to} key={id} />
              ))}
              {!user.is_activated && (
                <UserMenuItem text="Verify Account" to="/verify-account" />
              )}

              <Divider />
              <Text fontSize="24px" fontWeight="bold" pl="36px" py="13px">
                Orders
              </Text>
              <Divider />
              {loggedInMenuOrderItems.map(({ id, text, to }) => (
                <UserMenuItem text={text} to={to} key={id} />
              ))}
            </DrawerBody>
          </>
        ) : (
          <DrawerBody></DrawerBody>
        )}

        <DrawerFooter>
          {user ? (
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
