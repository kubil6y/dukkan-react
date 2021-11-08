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

  const getItemByStatus = (status: boolean, first: any, second: any): any => {
    return status ? first : second;
  };

  const handleFirstPageClick = (status: boolean) => {
    if (status) {
      setPage(1);
    }
  };
  const handlePrevPageClick = (status: boolean) => {
    if (status) {
      setPage((i: number) => i - 1);
    }
  };
  const handleNextPageClick = (status: boolean) => {
    if (status) {
      setPage((i: number) => i + 1);
    }
  };
  const handleLastPageClick = (status: boolean) => {
    if (status) {
      setPage(last_page);
    }
  };

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
        cursor={getItemByStatus(firstPageButtonStatus, "pointer", "cursor")}
        as={BiArrowToLeft}
        w={size}
        h={size}
        color={getItemByStatus(
          firstPageButtonStatus,
          activeColor,
          disabledColor
        )}
        onClick={() => handleFirstPageClick(firstPageButtonStatus)}
      />
      <Icon
        cursor={getItemByStatus(prevButtonStatus, "pointer", "cursor")}
        as={IoIosArrowBack}
        w={size}
        h={size}
        color={getItemByStatus(prevButtonStatus, activeColor, disabledColor)}
        onClick={() => handlePrevPageClick(prevButtonStatus)}
      />
      <Text fontSize={fs}>
        {current_page}/{last_page}
      </Text>
      <Icon
        cursor={getItemByStatus(nextButtonStatus, "pointer", "cursor")}
        as={IoIosArrowForward}
        w={size}
        h={size}
        color={getItemByStatus(nextButtonStatus, activeColor, disabledColor)}
        onClick={() => handleNextPageClick(nextButtonStatus)}
      />
      <Icon
        cursor={getItemByStatus(nextButtonStatus, "pointer", "cursor")}
        as={BiArrowToRight}
        w={size}
        h={size}
        color={getItemByStatus(
          lastPageButtonStatus,
          activeColor,
          disabledColor
        )}
        onClick={() => handleLastPageClick(lastPageButtonStatus)}
      />
    </Grid>
  );
};
