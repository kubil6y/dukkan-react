import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../components/carousel/Carousel";
import { Text, Center, Grid } from "@chakra-ui/react";
import { colors } from "../themes/colors";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dukkan | Spend less. Smile more.</title>
      </Helmet>
      <Carousel />

      <Center
        fontSize="14px"
        bg={colors.lightGrayPrimary}
        p="5px"
        textAlign="center"
      >
        <Text>
          You are on a clone website. You can shop on Amazon for millions of
          products with fast local delivery.{" "}
          <Link
            to={{ pathname: "https://www.amazon.com" }}
            target="_blank"
            rel="noopener noreferer"
            className="home-message-link"
          >
            Click here to go to amazon.com
          </Link>{" "}
          :)
        </Text>
      </Center>

      <Grid></Grid>
    </>
  );
};
