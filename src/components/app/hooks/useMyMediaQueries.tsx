import { useEffect, useState } from "react";
import { useMediaQuery } from "@chakra-ui/react";

/*
export const useIsMediumScreen = () => {
  const [isMediumScreen] = useMediaQuery(
    "(min-width: 500px) and (max-width: 1023px)"
  );
  const [result, setResult] = useState(isMediumScreen);

  useEffect(() => {
    setResult(isMediumScreen);
  }, [isMediumScreen]);

  return result;
};

export const useIsLargeScreen = () => {
  const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");
  const [result, setResult] = useState(isLargeScreen);

  useEffect(() => {
    setResult(isLargeScreen);
  }, [isLargeScreen]);

  return result;
};

export const useIsSmallScreen = () => {
  const [isSmallScreen] = useMediaQuery("(max-width: 499px)");
  const [result, setResult] = useState(isSmallScreen);

  useEffect(() => {
    setResult(isSmallScreen);
  }, [isSmallScreen]);

  return result;
};
*/

interface UseMyMediaQueries {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
}

export const useMyMediaQueries = (): UseMyMediaQueries => {
  const [isSmallScreen] = useMediaQuery("(max-width: 499px)");
  const [isMediumScreen] = useMediaQuery(
    "(min-width: 500px) and (max-width: 1023px)"
  );
  const [isLargeScreen] = useMediaQuery("(min-width: 1024px)");

  const [result, setResult] = useState<UseMyMediaQueries>({
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  });

  useEffect(() => {
    setResult((prev) => ({ ...prev, isSmallScreen }));
  }, [isSmallScreen]);

  useEffect(() => {
    setResult((prev) => ({ ...prev, isMediumScreen }));
  }, [isMediumScreen]);

  useEffect(() => {
    setResult((prev) => ({ ...prev, isLargeScreen }));
  }, [isLargeScreen]);

  return result;
};
