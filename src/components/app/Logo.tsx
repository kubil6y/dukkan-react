import { FC } from "react";
import { Image, Flex } from "@chakra-ui/react";
import LogoLight from "../../images/amazon-logo.png";
import LogoDark from "../../images/amazon-logo-dark.png";
import { useHistory, useLocation } from "react-router-dom";
import { colors } from "../../themes/colors";
import { includes } from "../../helpers";

type Theme = "light" | "dark";

interface ILogoProps {
  theme?: Theme;
}

export const Logo: FC<ILogoProps> = ({ theme }) => {
  const src = theme === "light" ? LogoLight : LogoDark;
  const { pathname } = useLocation();
  const history = useHistory();

  const show = !includes(["/register", "/login"], pathname);

  return (
    <Flex
      onClick={() => history.push("/")}
      justifyContent="center"
      alignItems="center"
      className="image-container"
      border="1px solid transparent"
      borderRadius="2px"
      height="100%"
      _hover={{
        ...(show && {
          borderColor: colors.lightGrayPrimary,
        }),
      }}
    >
      <Image
        bgSize="contain"
        bgPos="center center"
        src={src}
        alt="app logo"
        _hover={{ cursor: "pointer" }}
        maxW="100%"
        maxH="100%"
      />
    </Flex>
  );
};
