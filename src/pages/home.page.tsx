import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Carousel } from "../components/carousel/Carousel";
import { Text, Center, VStack, HStack } from "@chakra-ui/react";
import { Container } from "../components/app/Container";
import { FamilyReviews } from "../components/misc/FamilyReviews";
import { CategoryCard } from "../components/cards/CategoryCard";
import { useIsSmallScreen } from "../components/app/hooks/mediaQueries";

export const HomePage = () => {
  const isSmallScreen = useIsSmallScreen();
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

        {isSmallScreen ? (
          <VStack my="1rem" spacing="1rem">
            <CategoryCard
              to="/categories/electronics"
              title="Electronics"
              imgSrc="/category_laptop.jpg"
            />

            <CategoryCard
              to="/categories/furniture"
              title="Furniture"
              imgSrc="/category_furniture.jpg"
            />

            <CategoryCard
              to="/categories/beauty"
              title="Beauty"
              imgSrc="/category_beauty.jpg"
            />

            <CategoryCard
              to="/categories/deals"
              title="Deals"
              imgSrc="/category_deals.jpg"
            />
          </VStack>
        ) : (
          <HStack mt="1rem" mb="2rem" spacing="2rem">
            <CategoryCard
              to="/categories/electronics"
              title="Electronics"
              imgSrc="/category_laptop.jpg"
            />

            <CategoryCard
              to="/categories/furniture"
              title="Furniture"
              imgSrc="/category_furniture.jpg"
            />

            <CategoryCard
              to="/categories/beauty"
              title="Beauty"
              imgSrc="/category_beauty.jpg"
            />

            <CategoryCard
              to="/categories/deals"
              title="Deals"
              imgSrc="/category_deals.jpg"
            />
          </HStack>
        )}

        <FamilyReviews />
      </Container>
    </>
  );
};
