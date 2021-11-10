import { FC } from "react";
import { Container } from "../components/app/Container";
import { Text, Box, Divider, Flex, Button } from "@chakra-ui/react";
import { capitalize } from "../helpers";
import { colors } from "../themes/colors";
import { useHistory } from "react-router-dom";
import { useUser, useMyMediaQueries } from "../components/app/hooks";

interface ProfilePageItemProps {
  fieldName: string;
  value: any;
}

export const ProfilePageItem: FC<ProfilePageItemProps> = ({
  fieldName,
  value,
}) => {
  const { isSmallScreen } = useMyMediaQueries();
  const fs = isSmallScreen ? "16px" : "18px";

  return (
    <>
      <Flex
        _hover={{ backgroundColor: colors.lightGraySecondary }}
        p="8px"
        flexDirection={isSmallScreen ? "column" : "row"}
      >
        <Box width={isSmallScreen ? "100%" : "200px"}>
          <Text fontWeight="bold" fontSize={fs}>
            {fieldName}
          </Text>
        </Box>
        <Text ml={isSmallScreen ? "0" : "2rem"} maxW="200px" fontSize={fs}>
          {String(value)}
        </Text>
      </Flex>
      <Divider my="5px" />
    </>
  );
};

export const ProfilePage: FC = () => {
  const history = useHistory();
  const { isLargeScreen } = useMyMediaQueries();
  const { user } = useUser();
  if (!user) return null;

  const minW = isLargeScreen ? "500px" : "280px";

  return (
    <Container>
      <Flex>
        <Box py="2rem" px="10px" mx="auto" minW={minW}>
          <Flex alignItems="center">
            <Text as="h2" fontSize="28px" fontWeight="bold">
              My Profile
            </Text>
            <Button
              ml="1rem"
              colorScheme="facebook"
              size="xs"
              onClick={() => history.push("/me/edit")}
            >
              Edit
            </Button>
          </Flex>
          <Divider my="1rem" />
          <ProfilePageItem
            fieldName="First Name"
            value={capitalize(user.first_name)}
          />
          <ProfilePageItem
            fieldName="Last Name"
            value={capitalize(user.last_name)}
          />
          <ProfilePageItem fieldName="Email Address" value={user.email} />
          <ProfilePageItem fieldName="Address" value={user.address} />
          <ProfilePageItem
            fieldName="Account Verification Status"
            value={user.is_activated ? "Verified" : "Not Verified"}
          />
        </Box>
      </Flex>
    </Container>
  );
};
