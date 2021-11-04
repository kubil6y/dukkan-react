import { FC } from "react";
import { colors } from "../../themes/colors";
import { Flex, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const ReturnsOrders: FC = () => {
  const history = useHistory();
  return (
    <Flex
      className="nav-border"
      color={colors.lightGrayPrimary}
      justifyContent="center"
      flexDir="column"
      minW="100px"
      onClick={() => history.push("/my-orders")}
    >
      <Text fontSize="12px">Returns</Text>
      <Text fontSize="14px" fontWeight="700">
        & Orders
      </Text>
    </Flex>
  );
};
