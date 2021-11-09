import { Flex, Text, Image, Box, Center } from "@chakra-ui/react";
import { FC } from "react";
import { Product } from "../../types";
import { useIsLargeScreen } from "../app/hooks/mediaQueries";
import { FancyCurrency } from "../misc/FancyCurrency";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const isLargeScreen = useIsLargeScreen();
  const w = isLargeScreen ? "250px" : "100%";
  return (
    <Box
      p="1rem"
      w={w}
      bg="white"
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      className="space-y-2"
      ml="2rem"
    >
      <Link to={`/products/${product.slug}`}>
        <Center>
          <Image src={product.image} alt="card" maxH="200px" />
        </Center>
      </Link>

      <Box mt="1rem">
        <Text fontSize="18px">
          {product.brand} {product.name}
        </Text>

        <Text fontSize="14px" isTruncated color="gray.500">
          {product.description}
        </Text>

        <Text fontSize="12px">Ships to Albania</Text>

        <FancyCurrency value={product.price} fs={14} color="red.400" />
      </Box>
    </Box>
  );
};
