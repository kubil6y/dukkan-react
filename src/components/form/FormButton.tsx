import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface FormButtonProps {
  text: string;
  isLoading: boolean;
  loadingText: string;
  isDisabled: boolean;
}

export const FormButton: FC<FormButtonProps> = ({
  text,
  isLoading,
  loadingText,
  isDisabled,
}) => {
  return (
    <Button
      colorScheme="blue"
      width="100%"
      type="submit"
      isLoading={isLoading}
      loadingText={loadingText}
      textTransform="capitalize"
      isDisabled={isDisabled}
    >
      {text}
    </Button>
  );
};
