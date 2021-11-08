import { axiosInstance } from "../axios/axiosInstance";
import { EditProfileDTO } from "../types";

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
