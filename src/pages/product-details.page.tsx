import {
  Box,
  Center,
  Spinner,
  Flex,
  Image,
  Text,
  Select,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateReviewProduct, useProduct } from "../react-query/hooks";
import { ProductDetailsResponse, ReviewDTO } from "../types";
import { Container } from "../components/app/Container";
import { Helmet } from "react-helmet-async";
import { Ratings } from "../components/misc/Ratings";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useMyMediaQueries, useUser } from "../components/app/hooks";
import { genArrayOfNElements } from "../helpers";
import { useSetRecoilState } from "recoil";
import { cartMenuState } from "../recoil/atoms";
import { useCartItems } from "../components/app/hooks/useCartItems";
import { ProductReview } from "../components/misc/ProductReview";
import { reviewSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "../components/form";

interface IParams {
  slug: string;
}

export const ProductDetailsPage: FC = () => {
  const { slug } = useParams<IParams>();
  const { data, isLoading, isError } = useProduct(slug);
  const { addCartItem } = useCartItems();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<ReviewDTO>({
    mode: "onChange",
    resolver: yupResolver(reviewSchema),
  });

  const createReviewMutation = useCreateReviewProduct(
    { text: getValues("text") },
    slug,
    setValue
  );

  const setIsCartOpen = useSetRecoilState(cartMenuState);
  const [qty, setQty] = useState(1);

  const { isSmallScreen } = useMyMediaQueries();
  const minH = isSmallScreen ? "60vh" : "80vh";

  if (isLoading === true) {
    return (
      <Center width="100%" minH="60vh">
        <Spinner size="md" />
      </Center>
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
  if (data?.ok === true) {
    const product: ProductDetailsResponse = data?.data?.product;

    let canReview = true;
    for (let i = 0; i < product.reviews.length; i++) {
      if (product.reviews[i]?.user && user) {
        if (product.reviews[i].user?.id === user?.id) {
          canReview = false;
        }
      }
    }

    const onSubmit = () => {
      console.log("from submit", { errors });
      createReviewMutation.mutate();
    };

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
                  <Button
                    textTransform="uppercase"
                    colorScheme="facebook"
                    onClick={handleAddToCart}
                    mt="1rem"
                    size="sm"
                    letterSpacing="wide"
                  >
                    Add to Cart
                  </Button>
                </>
              )}
            </Box>
          </Flex>

          <>
            {user ? (
              <>
                {canReview ? (
                  <Box maxW="800px" mx="auto">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Flex flexDir="column">
                        <Box width="100%">
                          <Textarea
                            {...register("text")}
                            size="sm"
                            mt="1rem"
                            bg="white"
                            borderRadius="4px"
                            placeholder="Write a review"
                          />
                          {errors?.text?.message && (
                            <FormErrorMessage message={errors.text.message} />
                          )}
                        </Box>
                        <Button
                          mt="1rem"
                          type="submit"
                          colorScheme="facebook"
                          ml="auto"
                          size="sm"
                        >
                          Submit
                        </Button>
                      </Flex>
                    </form>
                  </Box>
                ) : (
                  <div>
                    <h1>can NOT NOT NOT review</h1>
                  </div>
                )}
              </>
            ) : (
              <div>
                <h1>
                  you must be logged in and ordered to review the product!
                </h1>
              </div>
            )}
          </>

          <>
            {product?.reviews && product.reviews.length > 0 && (
              <Box maxW="800px" mx="auto">
                <Text fontSize="20px" fontWeight="bold" mt="2rem" mb="1rem">
                  Reviews
                </Text>

                <Box className="space-y-4">
                  {product.reviews.map((review) => (
                    <ProductReview
                      review={review}
                      key={review.id}
                      slug={slug}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </>
        </Container>
      </>
    );
  }
  return null;
};
