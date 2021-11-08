import { FC, useState } from "react";
import { Box, Center, Input, Text, Icon } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { useIsLargeScreen } from "../components/app/hooks/mediaQueries";
import { IoSendSharp } from "react-icons/io5";
import { colors } from "../themes/colors";
import { useCustomToast } from "../components/app/hooks/useCustomToast";
import { axiosInstance } from "../axios/axiosInstance";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atoms";
import { useHistory } from "react-router-dom";

export const VerifyAccountPage: FC = () => {
  const history = useHistory();
  const [user, setUser] = useRecoilState(userState);
  const [inputFocused, setInputFocused] = useState(false);
  const isLargeScreen = useIsLargeScreen();

  const fsPlaceholder = isLargeScreen ? "16px" : "12px";
  const maxW = isLargeScreen ? "600px" : "100%";
  const py = isLargeScreen ? "4rem" : "2rem";

  const [code, setCode] = useState("");
  const toast = useCustomToast();

  const generateTokenQueryFn = async () => {
    await axiosInstance.post("/tokens/generate-activation", {
      email: user?.email,
    });
  };

  const activateAccountQueryFn = async () => {
    await axiosInstance.post("/tokens/activation", {
      code: code,
    });
  };

  const generateMutation = useMutation(generateTokenQueryFn, {
    onSuccess: () => {
      toast({
        title: "Activation Code has been sent!",
        status: "info",
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        status: "error",
      });
    },
  });

  const activateMutation = useMutation(activateAccountQueryFn, {
    onSuccess: () => {
      toast({
        title: "Account has been verified",
        status: "info",
      });
      setUser((user) => {
        if (user !== null) {
          return { ...user, is_activated: true };
        }
        return user;
      });
      history.push("/");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        status: "error",
      });
    },
  });

  const handleGenerateToken = () => generateMutation.mutate();
  const handleSubmit = () => {
    console.log("submit!");
    if (code === "") return;
    activateMutation.mutate();
  };

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
          onSubmit={handleSubmit}
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
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Center
            bg={colors.orangeSecondary}
            px="12px"
            cursor="pointer"
            onClick={handleSubmit}
          >
            <Icon as={IoSendSharp} w={4} h={4} color={colors.darkGrayPrimary} />
          </Center>
        </form>

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
