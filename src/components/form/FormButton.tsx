import { Button } from "@chakra-ui/react";
import { FC } from "react";

interface FormButtonProps {
  text: string;
  isLoading: boolean;
  loadingText: string;
}

export const FormButton: FC<FormButtonProps> = ({
  text,
  isLoading,
  loadingText,
}) => {
  return (
    <Button
      type="submit"
      colorScheme="blue"
      width="100%"
      isLoading={isLoading}
      loadingText={loadingText}
      textTransform="capitalize"
    >
      {text}
    </Button>
  );
};
