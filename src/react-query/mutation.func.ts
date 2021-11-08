import { axiosInstance } from "../axios/axiosInstance";

export const generateTokenMutationFn = async (data: any) => {
  await axiosInstance.post("/tokens/generate-activation", data);
};

export const activateAccountMutationFn = async (data: any) => {
  await axiosInstance.post("/tokens/activation", data);
};

//export coonsot updateProfileMutationFn = async (data: any) => {
//await axiosInstance.post
//}
