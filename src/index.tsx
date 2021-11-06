import "./styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "react-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./react-query/client";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./components/app/App";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import { chakraTheme } from "./themes/chakra";

render(
  <Router>
    <RecoilRoot>
      <ChakraProvider theme={chakraTheme}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ChakraProvider>
    </RecoilRoot>
  </Router>,
  document.querySelector("#root")
);
