import { Box, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../components/carousel/Carousel";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dukkan | Spend less. Smile more.</title>
      </Helmet>
      <Box width="100%">
        <Text fontWeight="bold">Home page</Text>
        {/*
         *<Carousel />
         */}
      </Box>
    </>
  );
};
