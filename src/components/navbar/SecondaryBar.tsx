import { FC } from "react";
import { colors } from "../../themes/colors";
import { useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Center, Flex, Text, Icon } from "@chakra-ui/react";
import { useIsLargeScreen } from "../app/hooks/mediaQueries";
import { useSetRecoilState } from "recoil";
import { userMenuState } from "../../recoil/atoms";

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
      onClick={() => history.push(`/categories/${text.toLowerCase()}`)}
    >
      <Text>{text}</Text>
    </Center>
  );
};

export const SecondaryBar: FC = () => {
  const setUserMenuState = useSetRecoilState(userMenuState);
  const isLargeScreen = useIsLargeScreen();
  const fontSize = isLargeScreen ? "14px" : "12px";
  const pl = isLargeScreen ? "24px" : "4px";
  const lateralPosition = isLargeScreen ? "start" : "center";
  return (
    <Flex
      bg={colors.darkGraySecondary}
      color="white"
      h="36px"
      alignItems="center"
      justifyContent={lateralPosition}
      className="space-x-4"
      px={pl}
      fontSize={fontSize}
      textTransform="capitalize"
    >
      {isLargeScreen && (
        <Flex
          className="secondary-nav-border"
          justifyContent="center"
          alignItems="center"
          onClick={() => setUserMenuState(true)}
        >
          <Icon as={GiHamburgerMenu} w={4} h={4} color="white" />
          <Text fontWeight="bold" marginLeft="6px">
            Menu
          </Text>
        </Flex>
      )}
      {items.map(({ id, text }) => (
        <SecondaryBarItem key={id} text={text} />
      ))}
    </Flex>
  );
};
