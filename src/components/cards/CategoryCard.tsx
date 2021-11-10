import { FC } from "react";
import { Link } from "react-router-dom";
import { useMyMediaQueries } from "../app/hooks";
import { Flex, Text } from "@chakra-ui/react";

interface CategoryCardProps {
  title: string;
  imgSrc: any;
  to: string;
}

export const CategoryCard: FC<CategoryCardProps> = ({ title, imgSrc, to }) => {
  const { isLargeScreen } = useMyMediaQueries();
  const h = isLargeScreen ? "450px" : "300px";
  const w = isLargeScreen ? "360px" : "240px";
  const fs = isLargeScreen ? "21px" : "16px";
  return (
    <Flex
      w={w}
      h={h}
      p="1rem"
      bg="white"
      flexDir="column"
      justifyContent="space-between"
    >
      <Text fontSize={fs} fontWeight="bold">
        {title}
      </Text>
      <Link to={to}>
        <img src={imgSrc} alt="card" />
      </Link>
      <Link to={to} className="home-message-link">
        See more
      </Link>
    </Flex>
  );
};
