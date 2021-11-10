import { Flex, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartMenuState } from "../../recoil/atoms";
import { cartInfoState } from "../../recoil/selectors";
import { colors } from "../../themes/colors";
import { useMyMediaQueries } from "../app/hooks";

export const CartCount: FC = () => {
  const setIsOpen = useSetRecoilState(cartMenuState);

  const { count } = useRecoilValue(cartInfoState);
  const { isLargeScreen } = useMyMediaQueries();
  const fsCount = isLargeScreen ? "20px" : "16px";
  const fsCart = isLargeScreen ? "14px" : "10px";
  const iconSize = isLargeScreen ? 7 : 6;
  return (
    <Flex
      className="nav-border"
      alignItems="center"
      justifyContent="center"
      onClick={() => setIsOpen(true)}
    >
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
          {count}
        </Text>
        <Text fontSize={fsCart} color="white" lineHeight="1">
          Cart
        </Text>
      </Flex>
    </Flex>
  );
};
