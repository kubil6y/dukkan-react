import { UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { useCustomToast } from "../components/app/hooks/useCustomToast";
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
import { useUser } from "../components/app/hooks";
import { useAuthToken } from "../components/app/hooks/useAuthToken";

export const useActivateAccount = (data: any) => {
  const history = useHistory();
  const { user, updateUser } = useUser();
  const toast = useCustomToast();

  const mutation = useMutation(() => activateAccountMutationFn(data), {
    onSuccess: () => {
      toast({
        title: "Account has been verified",
        status: "info",
      });
      if (user !== null) {
        const newUser: User = { ...user, is_activated: true };
        updateUser(newUser);
      }
      history.push("/");
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
  });
  return mutation;
};

export const useUpdateProfile = (data: EditProfileDTO) => {
  const history = useHistory();
  const { token } = useAuthToken();
  const { user, updateUser } = useUser();

  const mutation = useMutation(() => updateProfileMutationFn(data, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.user);
      history.push("/me");
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
  const { token } = useAuthToken();
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
    }
  );
  return mutation;
};

export const useDeleteReview = (reviewID: number, slug: string) => {
  const toast = useCustomToast();
  const { token } = useAuthToken();
  const mutation = useMutation(() => deleteReviewMutationFn(reviewID, token), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.products, slug]);
      toast({
        title: "Review Deleted",
        status: "info",
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
  const { token } = useAuthToken();
  const mutation = useMutation(
    () => createReviewMutationFn(data, token, slug),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.products, slug]);
        toast({
          title: "Review Added",
          status: "info",
        });
      },
      onSettled: () => setValue("text", ""),
    }
  );
  return mutation;
};
