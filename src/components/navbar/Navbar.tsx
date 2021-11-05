import { FC } from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../recoil/selectors";
import { ActivateBanner } from "./ActivateBanner";
import { SecondaryBar } from "./SecondaryBar";
import { LargeScreenNavbar } from "./LargeScreenNavbar";
import { SmallScreenNavbar } from "./SmallScreenNavbar";
import { useIsLargeScreen } from "../app/hooks/useIsLargeScreen";

export const Navbar: FC = () => {
  const { isActivated, isLoggedIn } = useRecoilValue(userInfoState);
  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      {isLoggedIn && !isActivated && <ActivateBanner />}
      {isLargeScreen ? <LargeScreenNavbar /> : <SmallScreenNavbar />}
      <SecondaryBar />
    </>
  );
};
