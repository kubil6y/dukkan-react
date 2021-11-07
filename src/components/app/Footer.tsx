import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../../themes/colors";
import { useIsSmallScreen } from "./hooks/mediaQueries";

export const Footer: FC = () => {
  const isSmallScreen = useIsSmallScreen();
  const mt = isSmallScreen ? "1rem" : "2rem";
  return (
    <Box
      mt={mt}
      bg={colors.darkGraySecondary}
      color="white"
      py="1rem"
      textAlign="center"
    >
      <Text>Copyright &copy; Dukkan</Text>
    </Box>
  );
};
