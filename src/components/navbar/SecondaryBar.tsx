import { FC } from "react";
import { colors } from "../../themes/colors";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Center, Flex, Text, Icon } from "@chakra-ui/react";

const items = [
  { id: 1, text: "Electronics" },
  { id: 2, text: "Furniture" },
  { id: 3, text: "Beauty" },
  { id: 4, text: "Deals" },
];

interface SecondaryBarItemProps {
  text: string;
}
const SecondaryBarItem: FC<SecondaryBarItemProps> = ({ text }) => {
  const history = useHistory();
  return (
    <Center
      className="secondary-nav-border"
      cursor="pointer"
      onClick={() => history.push(`/categories/${text}`)}
    >
      <Text>{text}</Text>
    </Center>
  );
};

export const SecondaryBar: FC = () => {
  return (
    <Flex
      bg={colors.darkGraySecondary}
      color="white"
      h="36px"
      alignItems="center"
      justifyContent="start"
      className="space-x-4"
      paddingLeft="24px"
      fontSize="14px"
      textTransform="capitalize"
    >
      <Flex
        className="secondary-nav-border"
        justifyContent="center"
        alignItems="center"
      >
        <Icon as={GiHamburgerMenu} w={5} h={5} color="white" />
        <Text fontWeight="bold" marginLeft="6px">
          all
        </Text>
      </Flex>
      {items.map(({ id, text }) => (
        <SecondaryBarItem key={id} text={text} />
      ))}
    </Flex>
  );
};
