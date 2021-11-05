import { FC, useState } from "react";
import { Box, Center, Icon, Input, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useIsLargeScreen } from "../components/app/hooks/useIsLargeScreen";
import { IoSendSharp } from "react-icons/io5";
import { colors } from "../themes/colors";

export const VerifyAccountPage: FC = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const isLargeScreen = useIsLargeScreen();

  const fsPlaceholder = isLargeScreen ? "16px" : "12px";
  const maxW = isLargeScreen ? "600px" : "100%";

  return (
    <>
      <Helmet>
        <title>Dukkan | Verify Account</title>
      </Helmet>
      <Box py="4rem" px="1rem" maxW={maxW} mx="auto">
        <Text as="h2" fontSize="24px" fontWeight="bold">
          Email Verification
        </Text>

        <form
          className="nav-form"
          style={{
            marginTop: "12px",
            marginBottom: "8px",
            ...(inputFocused && {
              outlineColor: colors.orangeTernary,
              outlineStyle: "solid",
              outlineWidth: "3px",
            }),
          }}
        >
          <Center fontSize="12px" px="10px" bg={colors.orangeSecondary}>
            Code
          </Center>

          <Input
            type="text"
            bg="white"
            borderRadius="0"
            placeholder="Please enter your code here"
            _placeholder={{
              fontSize: fsPlaceholder,
            }}
            _focus={{ borderColor: "none" }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />

          <Center bg={colors.orangeSecondary} px="12px" cursor="pointer">
            <Icon as={IoSendSharp} w={4} h={4} color={colors.darkGrayPrimary} />
          </Center>
        </form>

        <Text fontSize="12px">
          If you have not received your code, click here to try again.
        </Text>
      </Box>
    </>
  );
};
