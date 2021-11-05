import { Flex, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { colors } from "../../themes/colors";
import { useIsLargeScreen } from "../app/hooks/useIsLargeScreen";

export const CartCount: FC = () => {
  const isLargeScreen = useIsLargeScreen();
  const fsCount = isLargeScreen ? "20px" : "16px";
  const fsCart = isLargeScreen ? "14px" : "10px";
  const iconSize = isLargeScreen ? 7 : 6;
  return (
    <Flex className="nav-border" alignItems="center" justifyContent="center">
      <Icon as={FiShoppingCart} w={iconSize} h={iconSize} color="white" />
      <Flex
        ml="4px"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        fontWeight="700"
        textAlign="center"
      >
        <Text fontSize={fsCount} color={colors.orangePrimary} lineHeight="1">
          0
        </Text>
        <Text fontSize={fsCart} color="white" lineHeight="1">
          Cart
        </Text>
      </Flex>
    </Flex>
  );
};
