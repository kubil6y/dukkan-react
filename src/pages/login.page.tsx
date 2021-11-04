import { useForm } from "react-hook-form";
import { Logo } from "../components/app/Logo";
import { Link, useHistory } from "react-router-dom";
import { CreateAuthenticationTokenDTO } from "../types";
import { FormInput, FormButton, FormErrorMessage } from "../components/form";
import { Helmet } from "react-helmet-async";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../auth/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Must be valid email").required("Must be provided"),
  password: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters"),
});

export const LoginPage = () => {
  const history = useHistory();
  const { createToken } = useAuth();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateAuthenticationTokenDTO>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    const { email, password } = getValues();

    try {
      await createToken({
        email,
        password,
      });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dukkan | Login</title>
      </Helmet>
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
          <Text fontSize="28px" fontWeight="semibold">
            Login account
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="1rem" marginBottom="24px" marginTop="1rem">
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
            </VStack>

            <FormButton
              text="Login"
              isLoading={false}
              loadingText="Submitting"
            />
          </form>
          <Text fontSize="13px" marginTop="1rem">
            Already have an account?{" "}
            <Link to="/register" className="link">
              Sign in.
            </Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
};
