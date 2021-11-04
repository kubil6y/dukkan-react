import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "../app/Logo";
import { Box, Flex } from "@chakra-ui/react";
import { CartCount } from "./CartCount";
import { DeliveryLocation } from "./DeliveryLocation";
import { SignInAndAccount } from "./SignInAndAccount";
import { SearchInput } from "./SearchInput";
import { ReturnsOrders } from "./ReturnsOrders";

export const Navbar: FC = () => {
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
