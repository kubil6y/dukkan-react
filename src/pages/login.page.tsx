import { useForm } from "react-hook-form";
import { Logo } from "../components/app/Logo";
import { CreateAuthenticationTokenDTO } from "../types";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { FormInput, FormButton, FormErrorMessage } from "../components/form";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateAuthenticationTokenDTO>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const values = getValues();
    console.log({ values });
    console.log({ errors });
  };

  return (
    <Flex padding="1rem" alignItems="center" flexDirection="column">
      <Box maxW="100px">
        <Logo theme="light" />
      </Box>
      <Box
        marginTop="1rem"
        borderRadius="4px"
        minW="350px"
        border="1px solid"
        borderColor="gray.300"
        paddingX="18px"
        paddingY="14px"
      >
        <Text fontSize="28px" marginBottom="1rem" fontWeight="semibold">
          Login account
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="1rem" marginBottom="24px">
            <Box width="100%">
              <FormInput
                label="email"
                options={register("email", {
                  required: "Must be provided",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Must be valid email address",
                  },
                })}
                isInvalid={Boolean(errors?.email)}
              />
              {errors?.email?.message && (
                <FormErrorMessage message={errors.email.message} />
              )}
            </Box>

            <Box width="100%">
              <FormInput
                label="password"
                options={register("password", {
                  required: "Must be provided",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                isInvalid={Boolean(errors?.password)}
              />
              {errors?.password?.message && (
                <FormErrorMessage message={errors.password.message} />
              )}
            </Box>
          </VStack>

          <FormButton text="Login" isLoading={false} loadingText="Submitting" />
        </form>
      </Box>
    </Flex>
  );
};
