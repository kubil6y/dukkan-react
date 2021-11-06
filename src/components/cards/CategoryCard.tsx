import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { useIsLargeScreen, useIsMediumScreen } from "../app/hooks/mediaQueries";

interface CategoryCardProps {
  title: string;
  imgSrc: any;
  to: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ title, imgSrc, to }) => {
  const isLargeScreen = useIsLargeScreen();
  console.log({
    isLargeScreen,
  });
  return (
    <Box>
      <Box>350x450</Box>
    </Box>
  );
};
