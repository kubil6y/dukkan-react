import { useForm } from "react-hook-form";
import { Logo } from "../components/app/Logo";
import { Link } from "react-router-dom";
import { CreateAuthenticationTokenDTO } from "../types";
import { FormInput, FormButton, FormErrorMessage } from "../components/form";
import { Helmet } from "react-helmet-async";
import { axiosInstance } from "../axios/axiosInstance";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userAuthTokenState } from "../recoil/atoms";
import { USER_TOKEN } from "../constants";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  CloseButton,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

export const LoginPage = () => {
  const [_, setAuthTokenState] = useRecoilState(userAuthTokenState);
  const [errMessage, setErrMessage] = useState({
    message: "",
    show: false,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreateAuthenticationTokenDTO>({
    mode: "onChange",
  });

  const onSubmit = async () => {
    const { email, password } = getValues();

    try {
      const {
        data: { ok, data },
      } = await axiosInstance.post("/tokens/authentication", {
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (ok && data?.authentication_token?.token) {
        localStorage.setItem(USER_TOKEN, data.authentication_token.token);
        setAuthTokenState(data.authentication_token.token);
      }

      setErrMessage({
        show: false,
        message: "",
      });
    } catch (e) {
      const err = e as AxiosError;
      if (err?.response?.data) {
        if (typeof err.response?.data?.error === "string") {
          setErrMessage({
            message: err.response?.data?.error,
            show: true,
          });
        }
      } else {
        // TODO
        console.log(err);
      }
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

          {errMessage.show && (
            <Alert status="error" my="8px">
              <AlertIcon />
              <AlertDescription fontSize="13px" className="fl">
                {errMessage.message}
              </AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setErrMessage((s) => ({ ...s, show: false }))}
              />
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="1rem" marginBottom="24px" marginTop="1rem">
              <Box width="100%">
                <FormInput
                  type="text"
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
                  type="password"
                  label="password"
                  options={register("password", {
                    required: "Must be provided",
                    minLength: {
                      value: 6,
                      message: "Must be at least 6 characters",
                    },
                  })}
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
