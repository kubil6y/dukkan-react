import { FC, useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { colors } from "../../themes/colors";
import { useIsLargeScreen } from "../app/hooks/mediaQueries";
import { Flex, Icon, Center, Input, Tooltip } from "@chakra-ui/react";
import { useDebounce } from "use-debounce/lib";
import { Product } from "../../types";
import { axiosInstance } from "../../axios/axiosInstance";

export const SearchInput: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputFocused, setInputFocused] = useState(false);
  const isLargeScreen = useIsLargeScreen();

  const [s, setS] = useState("");
  const [text] = useDebounce(s, 400);

  useEffect(() => {
    const getProducts = async () => {
      if (text === "") {
        if (products.length !== 0) {
          setProducts([]);
        }
        return;
      }
      try {
        const { data } = await axiosInstance.get(`/products?search=${text}`);

        if (data!.ok) {
          setProducts(data!.data!.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [text]);

  // TODO
  console.log(text);
  console.log(products);

  return (
    <form
      className="nav-form"
      style={{
        width: isLargeScreen ? "65%" : "100%",
        ...(inputFocused && {
          outlineColor: colors.orangeTernary,
          outlineStyle: "solid",
          outlineWidth: "3px",
        }),
      }}
    >
      <Flex
        bg={colors.lightGrayPrimary}
        alignItems="center"
        px="10px"
        _hover={{ cursor: "pointer" }}
      >
        <Tooltip
          label="Work in Progress"
          bg={colors.lightGrayPrimary}
          color={colors.darkGrayPrimary}
          fontSize="13px"
        >
          <Center fontSize="12px">All</Center>
        </Tooltip>
        <Icon
          as={IoMdArrowDropdown}
          w={4}
          h={4}
          color="gray.500"
          marginLeft="6px"
        />
      </Flex>

      <Input
        type="text"
        bg="white"
        borderRadius="0"
        placeholder="Search for Products"
        _focus={{ borderColor: "none" }}
        onChange={(e) => setS(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />

      <Center bg={colors.orangeSecondary} px="12px" cursor="pointer">
        <Icon as={GoSearch} w={5} h={5} color={colors.darkGrayPrimary} />
      </Center>
    </form>
  );
};
