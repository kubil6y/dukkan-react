import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "../app/Logo";
import { CartCount } from "./CartCount";
import { DeliveryLocation } from "./DeliveryLocation";
import { ReturnsOrders } from "./ReturnsOrders";
import { SearchInput } from "./SearchInput";
import { SignInAndAccount } from "./SignInAndAccount";

export const SmallScreenNavbar: FC = () => {
  return (
    <Flex bg={colors.darkGrayPrimary} flexDir="column">
      <Box h="40px" p="2px">
        <Logo />
      </Box>
      <SearchInput />
    </Flex>
  );
};
