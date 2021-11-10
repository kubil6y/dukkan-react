import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { useMyMediaQueries } from "./hooks";

export const Container: FC = ({ children }) => {
  const { isLargeScreen } = useMyMediaQueries();
  const px = isLargeScreen ? "12px" : "8px";
  return (
    <Box maxW="1500px" px={px} mx="auto">
      {children}
    </Box>
  );
};
