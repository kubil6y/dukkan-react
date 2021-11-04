import { FC } from "react";
import { Input, Text, Box } from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  type: string;
  placeholder?: string;
  isInvalid: boolean;
  options: any; // react form hook
}

export const FormInput: FC<FormInputProps> = ({
  label,
  type,
  isInvalid,
  options,
  placeholder,
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
        type={type}
        autoComplete="off"
        borderRadius="3px"
        size="sm"
        placeholder={placeholder}
        isInvalid={isInvalid}
        borderColor="#a6a6a6"
        height="31px"
        paddingX="7px"
        paddingY="3px"
        _focus={{
          boxShadow: "0 0 3px 2px rgb(228 121 17 / 50%)",
          borderColor: "#e77600",
        }}
      />
    </Box>
  );
};
