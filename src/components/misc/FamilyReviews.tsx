import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { colors } from "../../themes/colors";
import { useMyMediaQueries } from "../app/hooks";

export const FamilyReviews: FC = () => {
  const { isSmallScreen } = useMyMediaQueries();
  const flexDir = isSmallScreen ? "column" : "row";
  const fsText = isSmallScreen ? "14px" : "24px";
  const fsName = isSmallScreen ? "10px" : "16px";
  const posName = isSmallScreen ? "center" : "end";
  return (
    <Flex flexDir={flexDir}>
      <Image src="/family.jpeg" />
      <Flex
        grow={1}
        p="4rem"
        color={colors.darkGrayPrimary}
        bg="pink.400"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Text color="white" fontSize={fsText}>
            Thanks to Amazon, i get to enjoy my beautiful family.
          </Text>
          <Text textAlign={posName} fontSize={fsName} mt="5px">
            Jane Doe
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
