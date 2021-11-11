import { FC, useState } from "react";
import { Box, Center, Input, Text, Icon } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useUser, useMyMediaQueries } from "../components/app/hooks";
import { IoSendSharp } from "react-icons/io5";
import { colors } from "../themes/colors";
import { useGenerateCode, useActivateAccount } from "../react-query/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ActivateAccountDTO } from "../types";
import { activateAccountSchema } from "../validation";
import { FormErrorMessage } from "../components/form";

export const VerifyAccountPage: FC = () => {
  const { user } = useUser();
  const [inputFocused, setInputFocused] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ActivateAccountDTO>({
    mode: "onChange",
    resolver: yupResolver(activateAccountSchema),
  });

  const generateMutation = useGenerateCode({ email: user?.email });
  const activateMutation = useActivateAccount({ code: getValues("code") });

  const handleGenerateToken = () => generateMutation.mutate();

  const onSubmit = () => {
    activateMutation.mutate();
  };

  const { isLargeScreen } = useMyMediaQueries();
  const fsPlaceholder = isLargeScreen ? "16px" : "12px";
  const maxW = isLargeScreen ? "600px" : "100%";
  const py = isLargeScreen ? "4rem" : "2rem";
  return (
    <>
      <Helmet>
        <title>Dukkan | Verify Account</title>
      </Helmet>
      <Box py={py} px="1rem" maxW={maxW} mx="auto">
        <Text as="h2" fontSize="24px" fontWeight="bold">
          Email Verification
        </Text>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bar-wrapper"
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
            {...register("code")}
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

          <button
            type="submit"
            style={{
              backgroundColor: colors.orangeSecondary,
              paddingLeft: "12px",
              paddingRight: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon as={IoSendSharp} w={4} h={4} color={colors.darkGrayPrimary} />
          </button>
        </form>

        {errors?.code?.message && (
          <FormErrorMessage message={errors.code.message} />
        )}

        <Text fontSize="12px">
          If you have not received your code, click{" "}
          <span className="link" onClick={handleGenerateToken}>
            here
          </span>{" "}
          to try again.
        </Text>
      </Box>
    </>
  );
};
