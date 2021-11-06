import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../components/carousel/Carousel";
import { Text, Center, Grid } from "@chakra-ui/react";
import { Container } from "../components/app/Container";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dukkan | Spend less. Smile more.</title>
      </Helmet>
      <Carousel />

      <Container>
        <Center fontSize="14px" p="5px" textAlign="center">
          <Text>
            You are on a clone website. You can shop on{" "}
            <Link
              to={{
                pathname: "https://www.amazon.com",
              }}
              target="_blank"
              rel="noopener noreferer"
              className="home-message-link"
            >
              Amazon
            </Link>{" "}
            for millions of products with fast local delivery.{" "}
            <Link
              to={{
                pathname:
                  "https://github.com/kubil6y?tab=repositories&q=dukkan",
              }}
              target="_blank"
              rel="noopener noreferer"
              className="home-message-link"
            >
              Click here to check out my github repositories.
            </Link>{" "}
          </Text>
        </Center>

        <Grid></Grid>
      </Container>
    </>
  );
};
