import {
  Flex,
  Icon,
  Center,
  Input,
  Tooltip,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { FC, useEffect, useState, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import { colors } from "../../themes/colors";
import { useMyMediaQueries } from "../app/hooks";
import { useDebounce } from "use-debounce/lib";
import { Metadata, Product } from "../../types";
import { axiosInstance } from "../../axios/axiosInstance";
import { SearchResultItem } from "./SearchResultItem";
import { useClickOutside } from "../app/hooks/useClickOutside";
import { useLocation } from "react-router-dom";
import { Pagination } from "../misc/Pagination";

export const SearchInput: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [page, setPage] = useState(1);

  const [inputFocused, setInputFocused] = useState(false);
  const { isLargeScreen } = useMyMediaQueries();
  const [showDropbox, setShowDropbox] = useState(false);

  const [s, setS] = useState("");
  const [text] = useDebounce(s, 400);

  // refs for click outside
  const { key } = useLocation();
  const dropboxRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(dropboxRef, inputRef, () => {
    setS("");
    setShowDropbox(false);
  });

  useEffect(() => {
    setPage(1);
  }, [text]);

  useEffect(() => {
    setS("");
    setShowDropbox(false);
    setIsLoading(false);
    setPage(1);
  }, [key]);

  useEffect(() => {
    const getProducts = async () => {
      if (text === "") {
        if (products.length !== 0) {
          setProducts([]);
          setMetadata(null);
        }
        return;
      }
      setShowDropbox(true); // open dropbox
      setIsLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/products?search=${text}&limit=5&page=${page}`
        );

        if (data!.ok) {
          setProducts(data!.data!.products);
          setMetadata(data!.data!.metadata);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [text, page, products.length]);

  return (
    <div
      ref={inputRef}
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
          type="text"
          width="100%"
          bg="white"
          borderRadius="0"
          placeholder="Search for Products"
          _focus={{ borderColor: "none" }}
          value={s}
          onChange={(e) => setS(e.target.value)}
          onFocus={() => {
            setInputFocused(true);
            setShowDropbox(true);
          }}
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
          {showDropbox && s && isLoading ? (
            <Center py="4px" h="80px" w="100%">
              <Spinner />
            </Center>
          ) : (
            showDropbox &&
            products.length > 0 &&
            metadata && (
              <>
                {products.map((p) => (
                  <SearchResultItem key={p.id} product={p} />
                ))}

                <Pagination metadata={metadata} setPage={setPage} />
              </>
            )
          )}
        </Box>
      </form>

      <Center
        bg={colors.orangeSecondary}
        px="12px"
        cursor="pointer"
        onClick={() => setInputFocused(true)}
      >
        <Icon as={GoSearch} w={5} h={5} color={colors.darkGrayPrimary} />
      </Center>
    </div>
  );
};
