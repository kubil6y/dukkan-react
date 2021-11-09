import { Box, Flex, Spinner, Text, Grid } from "@chakra-ui/react";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Container } from "../components/app/Container";
import { useIsSmallScreen } from "../components/app/hooks/mediaQueries";
import { ProductCard } from "../components/cards/ProductCard";
import { capitalize } from "../helpers";
import { useProductsByCategorySlug } from "../react-query/hooks";
import { Product } from "../types";

interface IParams {
  slug: string;
}

export const CategoryPage: FC = () => {
  const { slug } = useParams<IParams>();
  const isSmallScreen = useIsSmallScreen();
  const minH = isSmallScreen ? "60vh" : "80vh";

  const { data, isLoading, isError } = useProductsByCategorySlug(slug);

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        minH={minH}
        width="100%"
      >
        <Spinner size="md" />
      </Flex>
    );
  }

  if (!data && isError) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minH={minH}
        width="100%"
      >
        <Text fontSize="1.5rem" fontWeight="bold" color="red.500">
          Something went wrong!
        </Text>
        <Link to="/">
          <Text fontSize="1rem" className="link">
            Go back Home
          </Text>
        </Link>
      </Flex>
    );
  }

  console.log({ data, isLoading, isError });

  if (data && !isError && !isLoading) {
    const products = data!.data.products as Product[];
    return (
      <>
        <Helmet>
          <title>Dukkan | Category {capitalize(slug)}</title>
        </Helmet>
        <Container>
          <Grid
            p="2rem"
            alignItems="flex-start"
            justifyContent="center"
            templateColumns="repeat(3, 1fr)"
            rowGap="2rem"
            maxW="800px"
            mx="auto"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }

  return null;
};
