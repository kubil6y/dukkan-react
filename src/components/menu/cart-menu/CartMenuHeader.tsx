import { DrawerHeader, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../../../themes/colors";

export const CartMenuHeader: FC = () => {
  return (
    <DrawerHeader bg={colors.darkGraySecondary} color="white">
      <Flex alignItems="center" color="white" fontSize="19px">
        <Text>Your Items</Text>
      </Flex>
    </DrawerHeader>
  );
};
