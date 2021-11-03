import { FC } from "react";
import { Input, Text, Box } from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  placeholder?: string;
  options: any; // react form hook
}

export const FormInput: FC<FormInputProps> = ({
  placeholder,
  label,
  options,
}) => {
  return (
    <Box width="100%">
      <Text
        fontWeight="bold"
        fontSize="14px"
        marginBottom="4px"
        textTransform="capitalize"
      >
        {label}
      </Text>
      <Input
        {...options}
        type="text"
        autoComplete="off"
        borderRadius="3px"
        size="sm"
        placeholder={placeholder}
      />
    </Box>
  );
};
