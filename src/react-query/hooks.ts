import axios from "axios";
import { UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useCustomToast } from "../components/app/hooks/useCustomToast";
import { capitalize } from "../helpers";
import { userAuthTokenState, userState } from "../recoil/atoms";
import { EditProfileDTO, ReviewDTO, User } from "../types";
import { queryClient } from "./client";
import { queryKeys } from "./constants";
import { getProductBySlug, getProductsByCategorySlug } from "./query.func";
import {
  activateAccountMutationFn,
  createReviewMutationFn,
  deleteReviewMutationFn,
  generateTokenMutationFn,
  updateProfileMutationFn,
  updateReviewMutationFn,
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

export const useUpdateReview = (
  reviewID: number,
  data: ReviewDTO,
  slug: string
) => {
  const toast = useCustomToast();
  const token = useRecoilValue(userAuthTokenState);
  const mutation = useMutation(
    () => updateReviewMutationFn(reviewID, data, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.products, slug]);
        toast({
          title: "Review Updated",
          status: "info",
        });
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          status: "error",
        });
      },
    }
  );
  return mutation;
};

export const useDeleteReview = (reviewID: number, slug: string) => {
  const toast = useCustomToast();
  const token = useRecoilValue(userAuthTokenState);
  const mutation = useMutation(() => deleteReviewMutationFn(reviewID, token), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.products, slug]);
      toast({
        title: "Review Deleted",
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

export const useCreateReviewProduct = (
  data: ReviewDTO,
  slug: string,
  setValue: UseFormSetValue<ReviewDTO>
) => {
  const toast = useCustomToast();
  const token = useRecoilValue(userAuthTokenState);
  const mutation = useMutation(
    () => createReviewMutationFn(data, token, slug),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.products, slug]);
        toast({
          title: "Review Added",
          status: "info",
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.data?.error &&
            typeof error.response?.data?.error === "string"
          ) {
            toast({
              title: capitalize(error.response?.data?.error),
              status: "error",
            });
          } else {
            toast({
              title: "server is fucked",
              status: "error",
            });
          }
        }
      },
      onSettled: () => setValue("text", ""),
    }
  );
  return mutation;
};
