import { Flex, Spinner, Text, Grid, Box } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Container } from "../components/app/Container";
import { useMyMediaQueries } from "../components/app/hooks";
import { ProductCard } from "../components/cards/ProductCard";
import { CategoryBanner } from "../components/misc/CategoryBanner";
import { Pagination } from "../components/misc/Pagination";
import { capitalize } from "../helpers";
import { useProductsByCategorySlug } from "../react-query/hooks";
import { Metadata, Product } from "../types";

interface IParams {
  slug: string;
}

export const CategoryPage: FC = () => {
  const { slug } = useParams<IParams>();
  const [page, setPage] = useState(1);

  const { isSmallScreen, isMediumScreen, isLargeScreen } = useMyMediaQueries();
  const minH = isSmallScreen ? "60vh" : "80vh";
  const templateColumns = isLargeScreen
    ? "repeat(3, 1fr)"
    : isMediumScreen
    ? "repeat(2, 1fr)"
    : "repat(1, 1fr)";

  const { data, isLoading, isError } = useProductsByCategorySlug(slug, page);

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

  if (data && !isError && !isLoading) {
    const products = data!.data.products as Product[];
    const metadata = data!.data.metadata as Metadata;
    return (
      <>
        <Helmet>
          <title>Dukkan | Category {capitalize(slug)}</title>
        </Helmet>
        <Container>
          <Box maxW="800px" mx="auto">
            {/* category names are hardcoded so slug works! */}
            <CategoryBanner categoryName={slug} />
            <Grid
              mt="2rem"
              alignItems="flex-start"
              justifyItems="space-between"
              templateColumns={templateColumns}
              gap="2rem"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
            <Box mt="2rem" w="100%">
              <Pagination setPage={setPage} metadata={metadata} />
            </Box>
          </Box>
        </Container>
      </>
    );
  }

  return null;
};
