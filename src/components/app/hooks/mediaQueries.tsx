import { useMediaQuery } from "@chakra-ui/react";

export const useIsMediumScreen = () => {
  const [isMediumScreen] = useMediaQuery(
    "(min-width: 500px) and (max-width: 1023px)"
  );
  return isMediumScreen;
};

export const useIsLargeScreen = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");
  return isLargeScreen;
};
