import { FC, useState } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { colors } from "../../../themes/colors";
import { useHistory } from "react-router-dom";

interface UserMenuItemProps {
  to: string;
  text: string;
}

export const UserMenuItem: FC<UserMenuItemProps> = ({ text, to }) => {
  const history = useHistory();
  const [isHovered, setIsHovered] = useState(false);

  const handleOnClick = () => {
    history.push(to);
  };
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      fontSize="14px"
      py="13px"
      pr="20px"
      pl="36px"
      onClick={handleOnClick}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bg={isHovered ? colors.lightGraySecondary : "white"}
    >
      <Text>{text}</Text>
      <Icon
        as={MdOutlineArrowForwardIos}
        w={4}
        h={4}
        color={isHovered ? "gray.700" : "gray.400"}
      />
    </Flex>
  );
};
