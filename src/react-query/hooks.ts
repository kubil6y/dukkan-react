import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useCustomToast } from "../components/app/hooks/useCustomToast";
import { userState } from "../recoil/atoms";
import { EditProfileDTO, User } from "../types";
import { queryKeys } from "./constants";
import {
  activateAccountMutationFn,
  generateTokenMutationFn,
  updateProfileMutationFn,
} from "./mutation.func";
import { getProductBySlug, getProductsByCategorySlug } from "./query.func";

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

export const useUpdateProfile = (data: EditProfileDTO, token: string) => {
  const history = useHistory();
  const toast = useCustomToast();
  const [user, setUserState] = useRecoilState(userState);

  const mutation = useMutation(() => updateProfileMutationFn(data, token), {
    onSuccess: () => {
      const { first_name, last_name, email, address } = data;

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

  return mutation;
};

export const useProduct = (slug: string) => {
  return useQuery([queryKeys.products, slug], () => getProductBySlug(slug));
};

export const useProductsByCategorySlug = (slug: string, page: number) => {
  return useQuery([queryKeys.products, queryKeys.category, slug, page], () =>
    getProductsByCategorySlug(slug, page)
  );
};
