import { FC } from "react";
import { Link } from "react-router-dom";
import notFoundImage from "../images/not-found.png";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Flex, Image, Text, Box, Icon } from "@chakra-ui/react";

export const NotFoundPage: FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      p="2rem"
      flexDir="column"
      bg="white"
    >
      <Link to="/">
        <Image src={notFoundImage} />
      </Link>
      <Box marginTop="1rem" maxH="70vh">
        <Link to="/">
          <Image src="https://images.dog.ceo/breeds/germanshepherd/n02106662_855.jpg" />
        </Link>
        <Box mt="12px" textAlign="center">
          <Text fontSize="13px">Powered By</Text>
          <Link
            to={{ pathname: "https://dog.ceo/dog-api/" }}
            target="_blank"
            rel="noopener noreferer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Dog CEO
            <Icon as={HiOutlineExternalLink} mx="2px" w={4} h={4} />
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};
//https://dog.ceo/api/breed/germanshepherd/images/random
