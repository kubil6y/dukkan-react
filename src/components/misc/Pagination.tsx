import { FC } from "react";
import { Metadata } from "../../types";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useIsSmallScreen } from "../app/hooks/mediaQueries";
import { Grid, Icon, Text } from "@chakra-ui/react";

interface PaginationProps {
  metadata: Metadata;
  setPage: any;
}

export const Pagination: FC<PaginationProps> = ({
  metadata: { first_page, last_page, page_size, current_page, total_records },
  setPage,
}) => {
  console.log({
    first_page,
    last_page,
    page_size,
    current_page,
    total_records,
  });
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? 4 : 5;
  const w = isSmallScreen ? "100%" : "40%";
  const fs = isSmallScreen ? "14px" : "18px";

  const activeColor = "gray.900";
  const disabledColor = "gray.400";

  const firstPageButtonStatus = current_page !== 1;
  const lastPageButtonStatus = current_page !== last_page;
  const nextButtonStatus = lastPageButtonStatus && last_page > current_page;
  const prevButtonStatus = firstPageButtonStatus && first_page < current_page;

  const getStatusColor = (b: boolean): string => {
    return b ? activeColor : disabledColor;
  };

  const handleFirstPageClick = () => setPage(1);
  const handlePrevPageClick = () => setPage((i: number) => i - 1);
  const handleNextPageClick = () => setPage((i: number) => i + 1);
  const handleLastPageClick = () => setPage(last_page);

  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      alignItems="center"
      justifyItems="center"
      mx="auto"
      h="40px"
      w={w}
      px="20px"
      py="8px"
    >
      <Icon
        cursor={firstPageButtonStatus ? "pointer" : "cursor"}
        as={BiArrowToLeft}
        w={size}
        h={size}
        color={getStatusColor(firstPageButtonStatus)}
        onClick={handleFirstPageClick}
      />
      <Icon
        cursor={prevButtonStatus ? "pointer" : "cursor"}
        as={IoIosArrowBack}
        w={size}
        h={size}
        color={getStatusColor(prevButtonStatus)}
        onClick={handlePrevPageClick}
      />
      <Text fontSize={fs}>{current_page}</Text>
      <Icon
        cursor={nextButtonStatus ? "pointer" : "cursor"}
        as={IoIosArrowForward}
        w={size}
        h={size}
        color={getStatusColor(nextButtonStatus)}
        onClick={handleNextPageClick}
      />
      <Icon
        cursor={lastPageButtonStatus ? "pointer" : "cursor"}
        as={BiArrowToRight}
        w={size}
        h={size}
        color={getStatusColor(lastPageButtonStatus)}
        onClick={handleLastPageClick}
      />
    </Grid>
  );
};
