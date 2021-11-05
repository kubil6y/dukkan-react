import { useMediaQuery } from "@chakra-ui/react";

export const useIsLargeScreen = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");
  return isLargeScreen;
};
