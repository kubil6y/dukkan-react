import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { capitalize } from "../../helpers";
import { Review, ReviewDTO } from "../../types";
import { FaTrashAlt } from "react-icons/fa";
import { useUser } from "../app/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reviewSchema } from "../../validation";
import { FormErrorMessage } from "../form";
import { useDeleteReview, useUpdateReview } from "../../react-query/hooks";

interface ProductReviewProps {
  review: Review;
  slug: string;
}

export const ProductReview: FC<ProductReviewProps> = ({ review, slug }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ReviewDTO>({
    mode: "onChange",
    defaultValues: {
      text: review.text,
    },
    resolver: yupResolver(reviewSchema),
  });

  const updateMutation = useUpdateReview(review.id, getValues(), slug);
  const deleteMutation = useDeleteReview(review.id, slug);

  const onSubmit = () => {
    updateMutation.mutate();
    setEditMode(false);
  };

  const handleEditClick = () => setEditMode((b) => !b);

  const handleDelete = () => {
    if (editMode) {
      setEditMode(false);
    }
    deleteMutation.mutate();
  };

  const fullName =
    capitalize(review!.user!.first_name) +
    " " +
    capitalize(review!.user!.last_name);
  return (
    <Box bg="white" borderRadius="4px" boxShadow="lg" p="1rem">
      <Flex alignItems="center">
        <Text fontSize="16px" fontWeight="bold">
          {fullName}
        </Text>
        <Text fontSize="13px" color="gray.500" ml="1rem">
          {dayjs(review.created_at).fromNow()}
        </Text>

        {user && review.user!.id === user.id && (
          <Flex ml="1rem" alignItems="center" flexGrow={1}>
            <Button
              size="xs"
              fontSize="12px"
              colorScheme="red"
              cursor="pointer"
              onClick={handleEditClick}
            >
              {editMode ? "Cancel" : "Edit"}
            </Button>
            <Center ml="auto">
              <Icon
                as={FaTrashAlt}
                h={4}
                w={4}
                onClick={handleDelete}
                cursor="pointer"
              />
            </Center>
          </Flex>
        )}
      </Flex>

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDir="column">
            <Box width="100%">
              <Textarea
                {...register("text")}
                size="sm"
                mt="1rem"
                borderRadius="4px"
              />
              {errors?.text?.message && (
                <FormErrorMessage message={errors.text.message} />
              )}
            </Box>
            <Button
              mt="1rem"
              onClick={onSubmit}
              colorScheme="facebook"
              ml="auto"
              size="sm"
            >
              Submit
            </Button>
          </Flex>
        </form>
      ) : (
        <Text fontSize="14px" mt="8px">
          {review.text}
        </Text>
      )}
    </Box>
  );
};
