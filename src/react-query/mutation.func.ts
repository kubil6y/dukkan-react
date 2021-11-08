import { axiosInstance } from "../axios/axiosInstance";
import { USER_TOKEN } from "../constants";
import { EditProfileDTO } from "../types";

export const generateTokenMutationFn = async (data: any) => {
  await axiosInstance.post("/tokens/generate-activation", data);
};

export const activateAccountMutationFn = async (data: any) => {
  await axiosInstance.post("/tokens/activation", data);
};

export const updateProfileMutationFn = async (data: EditProfileDTO) => {
  await axiosInstance({
    method: "PATCH",
    url: "/profile/edit",
    data: data,
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem(USER_TOKEN) || ""
      )}`,
    },
  });
};
