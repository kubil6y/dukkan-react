import { FC } from "react";
import { ActivateBanner } from "./ActivateBanner";
import { SecondaryBar } from "./SecondaryBar";
import { LargeScreenNavbar } from "./LargeScreenNavbar";
import { SmallScreenNavbar } from "./SmallScreenNavbar";
import { useIsLargeScreen } from "../app/hooks/useIsLargeScreen";
import { useUser } from "../../auth/useUser";

export const Navbar: FC = () => {
  const { user } = useUser();
  const isLargeScreen = useIsLargeScreen();
  return (
    <>
      {user && !user.is_activated && <ActivateBanner />}
      {isLargeScreen ? <LargeScreenNavbar /> : <SmallScreenNavbar />}
      <SecondaryBar />
    </>
  );
};
