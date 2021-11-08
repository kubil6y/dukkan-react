import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Flex, Box, VStack, Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useIsLargeScreen } from "../components/app/hooks/mediaQueries";
import { FormInput, FormButton, FormErrorMessage } from "../components/form";
import { RegisterDTO, User } from "../types";
import { useUser } from "../auth/useUser";
import { axiosInstance } from "../axios/axiosInstance";
import { USER_TOKEN } from "../constants";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/atoms";
import { useCustomToast } from "../components/app/hooks/useCustomToast";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .required("Must be provided"),
  last_name: yup
    .string()
    .required("Must be provided")
    .min(2, "Must be at least 2 characters"),
  email: yup.string().email("Must be valid email").required("Must be provided"),
  address: yup
    .string()
    .required("Must be provided")
    .min(12, "Must be at least 12 characters"),
  password: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters"),
  password_confirm: yup
    .string()
    .required("Must be provided")
    .min(6, "Must be at least 6 characters")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const UpdateProfilePage: FC = () => {
  const toast = useCustomToast();
  const history = useHistory();
  const setUserState = useSetRecoilState(userState);
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterDTO>({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      address: user?.address || "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const updateQueryFn = async () => {
    const values = getValues();
    await axiosInstance({
      method: "PATCH",
      url: "/profile/edit",
      data: values,
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem(USER_TOKEN) || ""
        )}`,
      },
    });
  };
  const mutation = useMutation(updateQueryFn, {
    onSuccess: () => {
      const { first_name, last_name, email, address } = getValues();

      if (user) {
        const copy: User = { ...user };
        if (first_name) copy.first_name = first_name;
        if (last_name) copy.last_name = last_name;
        if (email) copy.email = email;
        if (address) copy.address = address;
        setUserState(copy);
        history.push("/me");
      } else {
        history.push("/");
      }
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        status: "error",
      });
      history.push("/");
    },
  });

  const isLargeScreen = useIsLargeScreen();
  const minW = isLargeScreen ? "350px" : "280px";

  const onSubmit = () => {
    mutation.mutate();
  };

  return (
    <>
      <Helmet>
        <title>Dukkan | Register</title>
      </Helmet>
      <Flex padding="1rem" alignItems="center" flexDirection="column">
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
            Update Profile
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
              text="Update"
              isLoading={mutation.isLoading}
              loadingText="Submitting"
            />
          </form>
        </Box>
      </Flex>
    </>
  );
};