import { FC } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { colors } from "../../themes/colors";

export const DeliveryLocation: FC = () => {
  return (
    <Tooltip
      label="Work in Progress"
      bg={colors.lightGrayPrimary}
      color={colors.darkGrayPrimary}
      fontSize="13px"
    >
      <Flex className="nav-border" alignItems="center" minW="100px" mx="4px">
        <Icon
          as={HiOutlineLocationMarker}
          w={5}
          h={5}
          color="white"
          marginRight="4px"
        />
        <Flex color="white" flexDirection="column">
          <Text fontSize="12px" letterSpacing="wide">
            Deliver to
          </Text>
          <Text
            fontWeight="bold"
            fontSize="14px"
            marginTop="-2px"
            textAlign="end"
          >
            Albania
          </Text>
        </Flex>
      </Flex>
    </Tooltip>
  );
};
