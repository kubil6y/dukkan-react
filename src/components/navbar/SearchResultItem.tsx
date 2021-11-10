import { Box, Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { colors } from "../../themes/colors";
import { Product } from "../../types";
import { useMyMediaQueries } from "../app/hooks";

interface SearchResultItemProps {
  product: Product;
}

export const SearchResultItem: FC<SearchResultItemProps> = ({ product }) => {
  const history = useHistory();
  const { isSmallScreen } = useMyMediaQueries();
  return (
    <Flex
      className="space-x-4"
      fontSize="13px"
      alignItems="center"
      justifyContent="space-around"
      h="40px"
      w="100%"
      px="8px"
      py="4px"
      cursor="pointer"
      onClick={() => history.push(`/products/${product.slug}`)}
      _hover={{
        backgroundColor: colors.lightGrayPrimary,
      }}
    >
      {!isSmallScreen && (
        <Image src="/products/keyboard-2.jpg" alt={product.name} maxH="100%" />
      )}
      {!isSmallScreen && <Box>{product.brand}</Box>}
      <Box>{product.name}</Box>
      <Box>{product.price.toFixed(2)}$</Box>
    </Flex>
  );
};
