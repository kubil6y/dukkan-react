import { Navbar } from "../components/navbar/Navbar";
import { Box, Text } from "@chakra-ui/react";

export const HomePage = () => {
  return (
    <Box width="100%">
      <Navbar />
      <Text fontWeight="bold">Home page</Text>
    </Box>
  );
};
