import { FC } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { genArrayOfNElements, calculateStars } from "../../helpers";
import { Flex, Icon, Text } from "@chakra-ui/react";

interface RatingsProps {
  rating_average: number;
  rating_count: number;
}

export const Ratings: FC<RatingsProps> = ({ rating_average, rating_count }) => {
  const { full, half, empty } = calculateStars(rating_average, 5);
  const size = 4;
  return (
    <Flex alignItems="center">
      <Flex>
        {genArrayOfNElements(full).map((i) => (
          <Icon as={BsStarFill} w={size} h={size} key={i} color="gold" />
        ))}

        {genArrayOfNElements(half).map((i) => (
          <Icon as={BsStarHalf} w={size} h={size} key={i + 10} color="gold" />
        ))}

        {genArrayOfNElements(empty).map((i) => (
          <Icon as={BsStar} w={size} h={size} key={i + 100} />
        ))}
      </Flex>
      <Text fontSize="12px" ml="1rem">
        {rating_count} {rating_count > 1 ? "ratings" : "rating"}
      </Text>
    </Flex>
  );
};
