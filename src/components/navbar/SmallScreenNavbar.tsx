import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "../app/Logo";
import { CartCount } from "./CartCount";
import { SearchInput } from "./SearchInput";
import { GiHamburgerMenu } from "react-icons/gi";
import { Box, Flex, Icon } from "@chakra-ui/react";

export const SmallScreenNavbar: FC = () => {
  return (
    <Flex
      bg={colors.darkGrayPrimary}
      flexDir="column"
      p="4px"
      justifyContent="center"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Icon
          as={GiHamburgerMenu}
          w={8}
          h={8}
          color="white"
          cursor="pointer"
          onClick={() => console.log("clicked menu TODO")}
        />
        <Box h="40px" p="2px">
          <Logo />
        </Box>
        <CartCount />
      </Flex>
      <SearchInput />
    </Flex>
  );
};
