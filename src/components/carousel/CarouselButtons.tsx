import { FC } from "react";
import { Center, Icon } from "@chakra-ui/react";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import { useIsMediumScreen, useIsLargeScreen } from "../app/hooks/mediaQueries";

interface CarouselButtonProps {
  onClick: any;
}

export const CarouselNextButton: FC<CarouselButtonProps> = ({ onClick }) => {
  const isMediumScreen = useIsMediumScreen();
  const isLargeScreen = useIsLargeScreen();
  const h = "100%";
  const w = "50px";
  const size = isLargeScreen ? 8 : isMediumScreen ? 6 : 4;

  return (
    <Center
      onClick={onClick}
      position="absolute"
      right="0"
      top="0"
      cursor="pointer"
      h={h}
      w={w}
    >
      <Icon as={MdOutlineArrowForwardIos} w={size} h={size} />
    </Center>
  );
};

export const CarouselPrevButton: FC<CarouselButtonProps> = ({ onClick }) => {
  const isMediumScreen = useIsMediumScreen();
  const isLargeScreen = useIsLargeScreen();
  const h = "100%";
  const w = "50px";
  const size = isLargeScreen ? 8 : isMediumScreen ? 6 : 4;
  return (
    <Center
      onClick={onClick}
      position="absolute"
      left="0"
      top="0"
      cursor="pointer"
      h={h}
      w={w}
    >
      <Icon as={MdOutlineArrowBackIos} w={size} h={size} />
    </Center>
  );
};
