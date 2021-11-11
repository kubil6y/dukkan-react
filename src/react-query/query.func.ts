import axios, { AxiosResponse } from "axios";
import { axiosInstance } from "../axios/axiosInstance";

interface AxiosResponseWithCancel extends AxiosResponse {
  cancel: () => void;
}

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

export async function getUser(
  token: string
): Promise<AxiosResponseWithCancel | null> {
  const source = axios.CancelToken.source();

  if (!token) return null;
  const axiosResponse: AxiosResponseWithCancel = await axiosInstance.get(
    "/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cancelToken: source.token,
    }
  );

  axiosResponse.cancel = () => {
    source.cancel();
  };

  return axiosResponse;
}
