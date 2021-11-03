import { useForm } from "react-hook-form";
import { RegisterDTO } from "../types";
import { Logo } from "../components/app/Logo";
import { useEffect } from "react";
import { FormInput, FormErrorMessage, FormButton } from "../components/form";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterDTO>({
    mode: "onChange",
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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
          Create account
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="1rem" marginBottom="24px">
            <Box width="100%">
              <FormInput
                label="first name"
                options={register("first_name", {
                  required: "Must be provided",
                  minLength: {
                    value: 2,
                    message: "Must be at least 2 characters",
                  },
                })}
                isInvalid={Boolean(errors?.first_name)}
              />
              {errors?.first_name?.message && (
                <FormErrorMessage message={errors.first_name.message} />
              )}
            </Box>

            <Box width="100%">
              <FormInput
                label="last name"
                options={register("last_name", {
                  required: "Must be provided",
                  minLength: {
                    value: 2,
                    message: "Must be at least 2 characters",
                  },
                })}
                isInvalid={Boolean(errors?.last_name)}
              />
              {errors?.last_name?.message && (
                <FormErrorMessage message={errors.last_name.message} />
              )}
            </Box>

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
                label="address"
                options={register("address", {
                  required: "Must be provided",
                  minLength: {
                    value: 12,
                    message: "Must be at least 12 characters",
                  },
                })}
                isInvalid={Boolean(errors?.address)}
              />
              {errors?.address?.message && (
                <FormErrorMessage message={errors.address.message} />
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

            <Box width="100%">
              <FormInput
                label="password confirm"
                options={register("password_confirm", {
                  required: "Please confirm your password",
                  minLength: {
                    value: 6,
                    message: "Must be at least 6 characters",
                  },
                })}
                isInvalid={Boolean(errors?.password_confirm)}
              />
              {errors?.password_confirm?.message && (
                <FormErrorMessage message={errors.password_confirm.message} />
              )}
            </Box>
          </VStack>

          <FormButton
            text="register"
            isLoading={false}
            loadingText="Submitting"
          />
        </form>
      </Box>
    </Flex>
  );
};
