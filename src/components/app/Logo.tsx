import { FC } from "react";
import { Image } from "@chakra-ui/react";
import LogoLight from "../../images/amazon-logo.png";
import LogoDark from "../../images/amazon-logo-dark.png";

type Theme = "light" | "dark";

interface ILogoProps {
  theme?: Theme;
}

export const Logo: FC<ILogoProps> = ({ theme }) => {
  const src = theme === "light" ? LogoLight : LogoDark;
  return <Image src={src} alt="app logo" />;
};
