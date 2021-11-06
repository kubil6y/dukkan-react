import { FC } from "react";
import { colors } from "../../themes/colors";
import { Flex, Text } from "@chakra-ui/react";
import { useUser } from "../../auth/useUser";
import { capitalize } from "../../helpers";
import { useHistory } from "react-router-dom";

export const SignInAndAccount: FC = () => {
  const history = useHistory();
  const { user } = useUser();

  return (
    <Flex
      minW="100px"
      className="nav-border"
      color={colors.lightGrayPrimary}
      justifyContent="center"
      flexDir="column"
      textAlign="end"
      onClick={() => history.push("/me")}
      letterSpacing="wide"
    >
      <Text fontSize="12px">
        Hello, {user ? capitalize(user.first_name) : "Sign in"}
      </Text>
      <Text fontSize="14px" fontWeight="700">
        Account
      </Text>
    </Flex>
  );
};
