import { useForm } from "react-hook-form";
import { RegisterDTO } from "../types";
import { Logo } from "../components/app/Logo";
import { FormInput, FormErrorMessage, FormButton } from "../components/form";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { Link, useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth, useMyMediaQueries } from "../components/app/hooks";
import { registerUserSchema } from "../validation";

export const RegisterPage = () => {
  const history = useHistory();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterDTO>({
    mode: "onChange",
    resolver: yupResolver(registerUserSchema),
  });

  const { isLargeScreen } = useMyMediaQueries();
  const minW = isLargeScreen ? "350px" : "280px";

  const onSubmit = async () => {
    const input: RegisterDTO = {
      first_name: getValues("first_name").trim().toLowerCase(),
      last_name: getValues("last_name").trim().toLowerCase(),
      email: getValues("email"),
      address: getValues("address").trim().toLowerCase(),
      password: getValues("password"),
      password_confirm: getValues("password_confirm"),
    };
    try {
      await registerUser(input);
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dukkan | Register</title>
      </Helmet>
      <Flex padding="1rem" alignItems="center" flexDirection="column">
        <Box maxW="100px">
          <Logo theme="light" />
        </Box>
        <Box
          marginTop="1rem"
          borderRadius="4px"
          minW={minW}
          border="1px solid"
          borderColor="gray.300"
          paddingX="18px"
          paddingY="14px"
          bg="white"
        >
          <Text fontSize="28px" fontWeight="semibold">
            Create account
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="1rem" marginBottom="24px" marginTop="1rem">
              <Box width="100%">
                <FormInput
                  type="text"
                  label="first name"
                  options={register("first_name")}
                  isInvalid={Boolean(errors?.first_name)}
                />
                {errors?.first_name?.message && (
                  <FormErrorMessage message={errors.first_name.message} />
                )}
              </Box>

              <Box width="100%">
                <FormInput
                  type="text"
                  label="last name"
                  options={register("last_name")}
                  isInvalid={Boolean(errors?.last_name)}
                />
                {errors?.last_name?.message && (
                  <FormErrorMessage message={errors.last_name.message} />
                )}
              </Box>

              <Box width="100%">
                <FormInput
                  type="text"
                  label="email"
                  options={register("email")}
                  isInvalid={Boolean(errors?.email)}
                />
                {errors?.email?.message && (
                  <FormErrorMessage message={errors.email.message} />
                )}
              </Box>

              <Box width="100%">
                <FormInput
                  type="text"
                  label="address"
                  placeholder="At least 12 characters"
                  options={register("address")}
                  isInvalid={Boolean(errors?.address)}
                />
                {errors?.address?.message && (
                  <FormErrorMessage message={errors.address.message} />
                )}
              </Box>

              <Box width="100%">
                <FormInput
                  type="password"
                  label="password"
                  options={register("password")}
                  isInvalid={Boolean(errors?.password)}
                  placeholder="At least 6 characters"
                />
                {errors?.password?.message && (
                  <FormErrorMessage message={errors.password.message} />
                )}
              </Box>

              <Box width="100%">
                <FormInput
                  type="password"
                  label="password confirm"
                  options={register("password_confirm")}
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
          <Text fontSize="13px" marginTop="1rem">
            Already have an account?{" "}
            <Link to="/login" className="link">
              Sign in.
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
};
