import { Box } from "@chakra-ui/react";
import { FC } from "react";

export const Container: FC = ({ children }) => {
  return (
    <Box maxW="1500px" px="10px" mx="auto">
      {children}
    </Box>
  );
};
