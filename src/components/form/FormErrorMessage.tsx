import { FC } from "react";
import { Text } from "@chakra-ui/react";

interface FormErrorMessageProps {
  message: string;
}
export const FormErrorMessage: FC<FormErrorMessageProps> = ({ message }) => {
  return (
    <Text fontSize="12px" color="red.500" fontWeight="bold" marginTop="4px">
      {message}
    </Text>
  );
};
