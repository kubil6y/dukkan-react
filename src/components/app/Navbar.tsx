import { FC } from "react";
import { colors } from "../../themes/colors";
import { Logo } from "./Logo";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Box, Text, Flex, Icon, Tooltip } from "@chakra-ui/react";

export const Navbar: FC = () => {
  return (
    <Box bg={colors.darkGrayPrimary} justifyContent="space-between">
      <Flex mx="18px" my="0" h="60px" w="100%" py="10px" px="4px">
        <Logo />

        <Tooltip
          label="Work in Progress..."
          fontSize="13px"
          bg={colors.lightGrayPrimary}
          color={colors.darkGrayPrimary}
        >
          <Flex alignItems="center" marginLeft="24px" cursor="pointer">
            <Icon
              as={HiOutlineLocationMarker}
              w={5}
              h={5}
              color="white"
              marginRight="4px"
            />
            <Flex color="white" flexDirection="column">
              <Text fontSize="12px">Deliver to</Text>
              <Text fontWeight="bold" fontSize="14px" marginTop="-2px">
                Albania
              </Text>
            </Flex>
          </Flex>
        </Tooltip>

        {/* search input */}
      </Flex>
    </Box>
  );
};
