import { axiosInstance } from "../axios/axiosInstance";
import { EditProfileDTO, ReviewDTO } from "../types";

export const generateTokenMutationFn = (data: any) => {
  return axiosInstance.post("/tokens/generate-activation", data);
};

export const activateAccountMutationFn = (data: any) => {
  return axiosInstance.post("/tokens/activation", data);
};

export const updateProfileMutationFn = (
  data: EditProfileDTO,
  token: string
) => {
  return axiosInstance({
    method: "PATCH",
    url: "/profile/edit",
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateReviewMutationFn = (
  reviewID: number,
  data: ReviewDTO,
  token: string
) => {
  return axiosInstance({
    method: "PUT",
    url: `/products/${reviewID}/review`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteReviewMutationFn = (reviewID: number, token: string) => {
  return axiosInstance({
    method: "DELETE",
    url: `/products/${reviewID}/review`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createReviewMutationFn = (
  data: ReviewDTO,
  token: string,
  slug: string
) => {
  return axiosInstance({
    method: "POST",
    url: `/products/${slug}/review`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
