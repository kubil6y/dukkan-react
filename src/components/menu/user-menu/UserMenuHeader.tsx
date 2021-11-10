import { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import { colors } from "../../../themes/colors";
import { DrawerHeader, Flex, Icon, Text } from "@chakra-ui/react";
import { useUser } from "../../app/hooks";
import { capitalize } from "../../../helpers";
import { useHistory } from "react-router-dom";

export const UserMenuHeader: FC = () => {
  const { user } = useUser();
  const history = useHistory();
  return (
    <DrawerHeader bg={colors.darkGraySecondary} color="white">
      <Flex alignItems="center" color="white" fontSize="19px">
        <Icon as={FaUserCircle} w={6} h={6} marginRight="12px" />
        {user ? (
          <Text>Hello {capitalize(user.first_name)}</Text>
        ) : (
          <Text>
            Hello,{" "}
            <Text
              as="span"
              cursor="pointer"
              className="text-underline"
              onClick={() => {
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
