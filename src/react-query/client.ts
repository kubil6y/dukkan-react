import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { QueryClient } from "react-query";
import { capitalize } from "../helpers";

const SERVER_ERROR_MESSAGE = "Error connecting to server";

const toast = createStandaloneToast();

export function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  let title: string = "";
  if (axios.isAxiosError(error)) {
    if (
      error.response?.data?.error &&
      typeof error.response?.data?.error === "string"
    ) {
      title = capitalize(error.response?.data?.error);
    } else if (
      error.response?.data?.error &&
      typeof error.response?.data?.error === "object" &&
      error.response?.status === 422
    ) {
      // validation errors here
      // form validations will be handled by client side
      const fields = Object.keys(error.response?.data?.error);
      title = `Invalid fields: ${fields.join(", ")}`;
    } else {
      title = SERVER_ERROR_MESSAGE;
    }
  } else {
    title = "Something went wrong";
  }

  // prevent duplicate toasts
  toast.closeAll();
  toast({
    title,
    status: "error",
    variant: "subtle",
    isClosable: true,
    position: "top-right",
  });
}

export const defaultQueryClientOptions = {
  queries: {
    staleTime: 600000, // 10 minutes
    cacheTime: 900000, // default cacheTime is 5 minutes; doesn't make sense for staleTime to exceed cacheTime
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: queryErrorHandler,
  },
  mutations: {
    onError: queryErrorHandler,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryClientOptions,
});
