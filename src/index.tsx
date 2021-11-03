import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./react-query/client";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./components/app/App";

render(
  <Router>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </Router>,
  document.querySelector("#root")
);
