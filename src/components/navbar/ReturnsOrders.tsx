import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../../themes/colors";
import { useHistory } from "react-router-dom";
import { useUser } from "../app/hooks";

export const ReturnsOrders: FC = () => {
  const { user } = useUser();
  const history = useHistory();
  return (
    <Flex
      className="nav-border"
      color={colors.lightGrayPrimary}
      justifyContent="center"
      flexDir="column"
      minW="100px"
      letterSpacing="wide"
      onClick={() => history.push(user ? "/my-orders" : "/register")}
    >
      <Text fontSize="12px">{user ? "Returns" : "New here?"}</Text>
      <Text fontSize="14px" fontWeight="700">
        {user ? "& Orders" : "Register"}
      </Text>
    </Flex>
  );
};
