import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";
import { capitalize } from "../../helpers";

interface CategoryBannerProps {
  categoryName: string;
}

export const CategoryBanner: FC<CategoryBannerProps> = ({ categoryName }) => {
  return (
    <>
      <Box p="1rem">
        <Text as="h1" fontSize="24px" fontWeight="bold">
          Category {capitalize(categoryName)}
        </Text>
      </Box>
      <Box h="1px" bg="gray.400" w="100%"></Box>
    </>
  );
};
