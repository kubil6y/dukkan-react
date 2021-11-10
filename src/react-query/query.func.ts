import { axiosInstance } from "../axios/axiosInstance";

export const alsdf = "alsdfjk";

export const getProductBySlug = async (slug: string) => {
  const { data } = await axiosInstance.get(`/products/${slug}`);
  return data;
};

export const getProductsByCategorySlug = async (slug: string, page: number) => {
  const { data } = await axiosInstance.get(
    `/products/${slug}/category?limit=6&page=${page}`
  );
  return data;
};
