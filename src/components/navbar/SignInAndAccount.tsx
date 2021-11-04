import { FC } from "react";
import { colors } from "../../themes/colors";
import { Flex, Text } from "@chakra-ui/react";

export const SignInAndAccount: FC = () => {
  return (
    <Flex
      minW="100px"
      className="nav-border"
      color={colors.lightGrayPrimary}
      justifyContent="center"
      flexDir="column"
    >
      <Text fontSize="12px">Hello, Sign in</Text>
      <Text fontSize="14px" fontWeight="700">
        Account
      </Text>
    </Flex>
  );
};
