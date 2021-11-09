import {
  Box,
  Center,
  Spinner,
  Flex,
  Image,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../react-query/hooks";
import { useCustomToast } from "../components/app/hooks/useCustomToast";
import { ProductDetailsResponse } from "../types";
import { Container } from "../components/app/Container";
import { Helmet } from "react-helmet-async";
import { Ratings } from "../components/misc/Ratings";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useIsSmallScreen } from "../components/app/hooks/mediaQueries";
import { genArrayOfNElements } from "../helpers";
import { useSetRecoilState } from "recoil";
import { cartMenuState } from "../recoil/atoms";
import { useCartItems } from "../components/app/hooks/useCartItems";

interface IParams {
  slug: string;
}

export const ProductDetailsPage: FC = () => {
  const { slug } = useParams<IParams>();
  const { data, isLoading, isError } = useProduct(slug);
  const { addCartItem } = useCartItems();

  const setIsCartOpen = useSetRecoilState(cartMenuState);
  const [qty, setQty] = useState(1);

  const toast = useCustomToast();
  const isSmallScreen = useIsSmallScreen();

  if (isLoading === true) {
    return (
      <Center width="100%" h="20%">
        <Spinner size="md" />
      </Center>
    );
  }

  if (isError === true) {
    toast({
      title: "Something went wrong",
      status: "error",
    });
    return null;
  }

  if (data?.ok === true) {
    const product: ProductDetailsResponse = data?.data?.product;

    const handleAddToCart = () => {
      if (qty <= 0 || qty > product.count) {
        return;
      }
      setIsCartOpen(true);
      addCartItem({
        uuid: uuidv4(),
        product: product,
        qty: qty,
      });
    };

    return (
      <>
        <Helmet>
          <title>
            Dukkan | {product.brand} {product.name}
          </title>
        </Helmet>
        <Container>
          <Flex
            py={isSmallScreen ? "1rem" : "2rem"}
            justifyContent="center"
            alignItems={isSmallScreen ? "center" : "flex-start"}
            flexDirection={isSmallScreen ? "column" : "row"}
            maxW="800px"
            mx="auto"
          >
            <Box width="50%" mb={isSmallScreen ? "1rem" : 0}>
              <Image src="/products/keyboard-2.jpg" />
            </Box>

            <Box
              width="50%"
              className="space-y-4"
              ml="1rem"
              p={isSmallScreen ? 0 : "1rem"}
            >
              <Text
                fontSize={isSmallScreen ? "20px" : "24px"}
                fontWeight="bold"
              >
                {product.brand} {product.name}
              </Text>
              <Text fontSize={isSmallScreen ? "14px" : "16px"}>
                {product.description}
              </Text>

              <Ratings
                rating_average={product.rating_average}
                rating_count={product.rating_count}
              />
              <Box width="100%">
                <Text fontSize="15px" color="gray.600">
                  Price:{" "}
                  <Text
                    as="span"
                    fontSize="16px"
                    color="red.400"
                    fontWeight="bold"
                  >
                    ${product.price.toFixed(2)}
                  </Text>
                </Text>
              </Box>

              {product.count === 0 ? (
                <>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    textTransform="uppercase"
                    mr="4px"
                    disabled
                  >
                    out of stock
                  </Button>
                  <Text fontSize="12px" mt="6px" ml="2px">
                    <Link to="/" className="link">
                      Go back Home
                    </Link>
                  </Text>
                </>
              ) : (
                <>
                  <Flex alignItems="center">
                    <Text fontSize="15px" color="gray.600">
                      Select:
                    </Text>
                    <Select
                      placeholder="Qty"
                      width="80px"
                      ml="1rem"
                      defaultValue={1}
                      onChange={(e) => setQty(+e.target.value)}
                    >
                      {genArrayOfNElements(product.count).map((i) => (
                        <option key={123 + i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                  <Button colorScheme="facebook" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </>
              )}
            </Box>
          </Flex>
        </Container>
      </>
    );
  }
  return null;
};
