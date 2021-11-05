import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "../app/Logo";
import { CartCount } from "./CartCount";
import { DeliveryLocation } from "./DeliveryLocation";
import { ReturnsOrders } from "./ReturnsOrders";
import { SearchInput } from "./SearchInput";
import { SignInAndAccount } from "./SignInAndAccount";

export const LargeScreenNavbar: FC = () => {
  return (
    <Box bg={colors.darkGrayPrimary}>
      <Flex className="space-x-2" mx="18px" my="0" h="60px" p="4px">
        <Logo />
        <DeliveryLocation />
        <SearchInput />
        <SignInAndAccount />
        <ReturnsOrders />
        <CartCount />
      </Flex>
    </Box>
  );
};
