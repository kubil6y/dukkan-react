import { axiosInstance } from "../axios/axiosInstance";

export const alsdf = "alsdfjk";

export const getProductBySlug = async (slug: string) => {
  const { data } = await axiosInstance.get(`/products/${slug}`);
  return data;
};
