import { FC, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { colors } from "../../themes/colors";
import { Flex, Icon, Tooltip, Center, Input } from "@chakra-ui/react";

export const SearchInput: FC = () => {
  const [inputFocused, setInputFocused] = useState(false);
  return (
    <form
      className="nav-form"
      style={{
        ...(inputFocused && {
          outlineColor: colors.orangeTernary,
          outlineStyle: "solid",
          outlineWidth: "3px",
        }),
      }}
    >
      <Flex w="100%" h="100%">
        <Tooltip
          label="Work in Progress"
          bg={colors.lightGrayPrimary}
          color={colors.darkGrayPrimary}
          fontSize="13px"
        >
          <Flex
            bg={colors.lightGrayPrimary}
            justifyContent="center"
            alignItems="center"
            px="10px"
            height="100%"
            _hover={{ cursor: "pointer" }}
          >
            <Center fontSize="12px">All</Center>
            <Icon
              as={IoMdArrowDropdown}
              w={4}
              h={4}
              color="gray.500"
              marginLeft="6px"
            />
          </Flex>
        </Tooltip>
        <Flex width="100%">
          <Input
            type="text"
            bg="white"
            borderRadius="0"
            placeholder="Search for Products"
            _focus={{ borderColor: "none" }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </Flex>
        <Center
          bg={colors.orangeSecondary}
          h="100%"
          px="12px"
          borderRightRadius="4px"
          cursor="pointer"
        >
          <Icon as={GoSearch} w={5} h={5} color={colors.darkGrayPrimary} />
        </Center>
      </Flex>
    </form>
  );
};
