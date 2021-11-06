import { FC } from "react";
import { Link } from "react-router-dom";
import { useIsLargeScreen, useIsMediumScreen } from "../app/hooks/mediaQueries";
import { Box, Text } from "@chakra-ui/react";

interface CategoryCardProps {
  title: string;
  imgSrc: any;
  to: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ title, imgSrc, to }) => {
  const isLargeScreen = useIsLargeScreen();
  const h = isLargeScreen ? "450px" : "300px";
  const w = isLargeScreen ? "360px" : "240px";
  const fs = isLargeScreen ? "21px" : "16px";
  console.log({
    isLargeScreen,
  });
  return (
    <Box w={w} h={h} p="1rem">
      <Text fontSize={fs} fontWeight="bold">
        {title}
      </Text>
      <img src={imgSrc} alt="card" />
      <Link to={to} className="home-message-link">
        See more
      </Link>
    </Box>
  );
};
