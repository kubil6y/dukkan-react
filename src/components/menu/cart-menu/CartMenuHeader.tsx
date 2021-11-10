import { DrawerHeader, Flex, Text, Icon } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartMenuState } from "../../../recoil/atoms";
import { colors } from "../../../themes/colors";
import { useCartItems } from "../../app/hooks/useCartItems";
import { AiOutlineClear } from "react-icons/ai";
import { cartInfoState } from "../../../recoil/selectors";

export const CartMenuHeader: FC = () => {
  const setIsOpen = useSetRecoilState(cartMenuState);
  const { clearCartItems } = useCartItems();
  const { count } = useRecoilValue(cartInfoState);

  const handleClearItems = () => {
    clearCartItems();
    setIsOpen(false);
  };
  return (
    <DrawerHeader bg={colors.darkGraySecondary} color="white">
      <Flex alignItems="center" color="white" fontSize="19px">
        <Text>Your Items</Text>

        {count > 0 && (
          <Flex
            ml="2rem"
            alignItems="center"
            onClick={handleClearItems}
            cursor="pointer"
          >
            <Text fontSize="12px" textTransform="uppercase">
              clear all
            </Text>
            <Icon as={AiOutlineClear} w={4} h={4} ml="4px" />
          </Flex>
        )}
      </Flex>
    </DrawerHeader>
  );
};
