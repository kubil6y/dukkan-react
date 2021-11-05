import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "../app/Logo";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { CartCount } from "./CartCount";
import { DeliveryLocation } from "./DeliveryLocation";
import { SignInAndAccount } from "./SignInAndAccount";
import { SearchInput } from "./SearchInput";
import { ReturnsOrders } from "./ReturnsOrders";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../recoil/selectors";
import { ActivateBanner } from "./ActivateBanner";
import { SecondaryBar } from "./SecondaryBar";
import { LargeScreenNavbar } from "./LargeScreenNavbar";
import { SmallScreenNavbar } from "./SmallScreenNavbar";
import { useIsLargeScreen } from "../app/hooks/useIsLargeScreen";

export const Navbar: FC = () => {
  const { isActivated, isLoggedIn } = useRecoilValue(userInfo);
  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      {isLoggedIn && !isActivated && <ActivateBanner />}
      {isLargeScreen ? <LargeScreenNavbar /> : <SmallScreenNavbar />}
      <SecondaryBar />
    </>
  );
};

/*
export const Navbar: FC = () => {
  const { isActivated, isLoggedIn } = useRecoilValue(userInfo);
  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      {isLoggedIn && !isActivated && <ActivateBanner />}
      <Box bg={colors.darkGrayPrimary}>
        <Flex className="space-x-2" mx="18px" my="0" h="60px" p="4px">
          <Logo />
          <DeliveryLocation />
          <SearchInput />
          <SignInAndAccount />
          <ReturnsOrders />
          <CartCount />
        </Flex>
        <SecondaryBar />
      </Box>
    </>
  );
};
 */
