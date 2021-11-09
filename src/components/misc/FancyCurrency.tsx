import { Flex, Text } from "@chakra-ui/layout";
import { FC } from "react";

interface FacnyCurrenyProps {
  value: number;
  fs: number;
  color: string;
}

export const FancyCurrency: FC<FacnyCurrenyProps> = ({ value, fs, color }) => {
  const dollars = Math.floor(value);
  let pennies = Math.round((value - dollars) * 100);

  return (
    <Flex alignItems="flex-start" color={color}>
      <Text fontSize={fs} mt={`${fs * 0.55}px`}>
        $
      </Text>
      <Text fontWeight="bold" fontSize={fs * 2}>
        {dollars}
      </Text>
      <Text fontSize={fs * 0.8} mt={`${fs * 0.5}px`}>
        {pennies === 0 ? "00" : pennies}
      </Text>
    </Flex>
  );
};
