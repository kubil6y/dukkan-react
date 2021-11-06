import { FC } from "react";
import { Center } from "@chakra-ui/react";
import { colors } from "../../themes/colors";

export const HomeMessage: FC = ({ children }) => {
  return (
    <Center
      fontSize="14px"
      bg={colors.lightGrayPrimary}
      p="5px"
      textAlign="center"
    >
      {children}
    </Center>
  );
};
