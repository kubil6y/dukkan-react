import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useCustomToast } from "../components/app/hooks/useCustomToast";
import { userState } from "../recoil/atoms";
import {
  activateAccountMutationFn,
  generateTokenMutationFn,
} from "./mutation.func";

export const useActivateAccount = (data: any) => {
  const history = useHistory();
  const setUser = useSetRecoilState(userState);
  const toast = useCustomToast();

  const mutation = useMutation(() => activateAccountMutationFn(data), {
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
  return mutation;
};

export const useGenerateCode = (data: any) => {
  const toast = useCustomToast();

  const mutation = useMutation(() => generateTokenMutationFn(data), {
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
  return mutation;
};

export const useUpdateProfile = () => {};
