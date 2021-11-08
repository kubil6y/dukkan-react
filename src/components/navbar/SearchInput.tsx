import { FC, useEffect, useState, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { colors } from "../../themes/colors";
import { useIsLargeScreen } from "../app/hooks/mediaQueries";
import { Flex, Icon, Center, Input, Tooltip, Box } from "@chakra-ui/react";
import { useDebounce } from "use-debounce/lib";
import { Product } from "../../types";
import { axiosInstance } from "../../axios/axiosInstance";
import { SearchResultItem } from "./SearchResultItem";
import { useClickOutside } from "../app/hooks/useClickOutside";
import { useLocation } from "react-router-dom";

export const SearchInput: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputFocused, setInputFocused] = useState(false);
  const isLargeScreen = useIsLargeScreen();
  const [showDropbox, setShowDropbox] = useState(false);

  const [s, setS] = useState("");
  const [text] = useDebounce(s, 400);

  // refs for click outside
  const { key } = useLocation();
  const dropboxRef = useRef(null);
  const inputRef = useRef(null);
  useClickOutside(dropboxRef, inputRef, () => {
    setShowDropbox(false);
  });

  useEffect(() => {
    setShowDropbox(false);
    setS("");
  }, [key]);

  useEffect(() => {
    const getProducts = async () => {
      if (text === "") {
        if (products.length !== 0) {
          setProducts([]);
        }
        return;
      }
      setShowDropbox(true); // open dropbox
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
    <div
      className="bar-wrapper"
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

      <form style={{ width: "100%", position: "relative" }}>
        <Input
          ref={inputRef}
          type="text"
          width="100%"
          bg="white"
          borderRadius="0"
          placeholder="Search for Products"
          _focus={{ borderColor: "none" }}
          onChange={(e) => setS(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />

        <Box
          ref={dropboxRef}
          zIndex="10"
          position="absolute"
          top="0"
          left="0"
          height="-100%"
          width="100%"
          mt="41px"
          bg="white"
          color={colors.darkGrayPrimary}
          shadow="lg"
        >
          {showDropbox &&
            products.length > 0 &&
            products.map((p) => <SearchResultItem key={p.id} product={p} />)}
        </Box>
      </form>

      <Center bg={colors.orangeSecondary} px="12px" cursor="pointer">
        <Icon as={GoSearch} w={5} h={5} color={colors.darkGrayPrimary} />
      </Center>
    </div>
  );
};
