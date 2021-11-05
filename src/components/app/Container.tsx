import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { useIsLargeScreen } from "./hooks/useIsLargeScreen";

export const Container: FC = ({ children }) => {
  const isLargeScreen = useIsLargeScreen();
  const px = isLargeScreen ? "12px" : "8px";
  return (
    <Box maxW="1500px" px={px} mx="auto">
      {children}
    </Box>
  );
};
