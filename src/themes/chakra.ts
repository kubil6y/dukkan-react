import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

export const chakraTheme = extendTheme({
  fonts: {
    body: "PT Sans",
  },

  styles: {
    global: {
      body: {
        color: colors.darkGrayPrimary,
        backgroundColor: colors.lightGrayPrimary,
      },
    },
  },
});
