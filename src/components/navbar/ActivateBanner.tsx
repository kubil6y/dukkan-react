import { FC } from "react";
import { colors } from "../../themes/colors";
import { Link } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import { useIsLargeScreen } from "../app/hooks/useIsLargeScreen";

export const ActivateBanner: FC = () => {
  const isLargeScreen = useIsLargeScreen();
  return (
    <Flex
      bg={colors.orangePrimary}
      color={colors.darkGrayPrimary}
      h="28px"
      alignItems="center"
      justifyContent="center"
    >
      <Link to="/verify-account">
        <Text
          fontSize="12px"
          letterSpacing="wide"
          textAlign="center"
          fontWeight="bold"
          textTransform="capitalize"
          _hover={{ textDecoration: "underline" }}
        >
          Please verify your account
        </Text>
      </Link>
    </Flex>
  );
};
