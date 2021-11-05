import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "../app/Logo";
import { CartCount } from "./CartCount";
import { SearchInput } from "./SearchInput";
import { GiHamburgerMenu } from "react-icons/gi";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { userMenuState } from "../../recoil/atoms";

export const SmallScreenNavbar: FC = () => {
  const setUserMenuState = useSetRecoilState(userMenuState);
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
          onClick={() => setUserMenuState(true)}
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
