import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import { colors } from "../../../themes/colors";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState } from "../../../recoil/selectors";
import { DrawerHeader, Flex, Icon, Text } from "@chakra-ui/react";
import { useUser } from "../../../auth/useUser";
import { capitalize } from "../../../helpers";
import { Link, useHistory } from "react-router-dom";
import { userMenuState } from "../../../recoil/atoms";

export const UserMenuHeader: FC = () => {
  const { isLoggedIn } = useRecoilValue(userInfoState);
  const { user } = useUser();
  const history = useHistory();
  const setIsOpen = useSetRecoilState(userMenuState);
  return (
    <DrawerHeader bg={colors.darkGraySecondary} color="white">
      <Flex alignItems="center" color="white" fontSize="19px">
        <Icon as={FaUserCircle} w={6} h={6} marginRight="12px" />
        {user && isLoggedIn ? (
          <Text>Hello {capitalize(user.first_name)}</Text>
        ) : (
          <Text>
            Hello,{" "}
            <Text
              as="span"
              cursor="pointer"
              className="text-underline"
              onClick={() => {
                setIsOpen(false);
                history.push("/login");
              }}
            >
              Sign In
            </Text>
          </Text>
        )}
      </Flex>
    </DrawerHeader>
  );
};
