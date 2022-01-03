import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Flex,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { CheckoutItem } from "../components/checkout/CheckoutItem";
import {
  useCartItems,
  useMyMediaQueries,
  useUser,
} from "../components/app/hooks";
import { useCreateOrder } from "../react-query/hooks";

export const CheckoutPage: FC = () => {
  const { user } = useUser();
  const { cartItems, calculateTotal, getCreateOrderData } = useCartItems();
  const { isSmallScreen } = useMyMediaQueries();
  const minH = isSmallScreen ? "60vh" : "80vh";

  console.log({ cartItems });

  const createOrderMutation = useCreateOrder(getCreateOrderData());

  function handleCompleteOrder() {
    createOrderMutation.mutate();
  }

  return (
    <>
      <Helmet>
        <title>Dukkan | Checkout</title>
      </Helmet>
      <Box maxW="container.md" mx="auto" mt="2rem" w="100%" minH={minH}>
        {cartItems.length > 0 ? (
          <>
            <Text as="h2" fontSize="3xl" mb="1.5rem">
              Checkout Details
            </Text>
            <Table variant="simple">
              <TableCaption>This is a mock transaction</TableCaption>
              <Thead>
                <Tr>
                  <Th>Product Name</Th>
                  <Th>Price</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Sum</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map((item) => (
                  <CheckoutItem key={item.uuid} item={item} />
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Total</Th>
                  <Th></Th>
                  <Th></Th>
                  <Th isNumeric fontSize="lg">
                    {calculateTotal().toFixed(2)}$
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
            <Box mt="1rem">
              <Text as="h2" fontSize="3xl" mb="1.5rem">
                Address
              </Text>
              <Text textTransform="capitalize">{user?.address}</Text>
            </Box>
            <Flex mt="1rem" width="100%">
              <Button
                //variant="outline"
                colorScheme="orange"
                marginLeft="auto"
                onClick={handleCompleteOrder}
                mt="1rem"
              >
                Complete Order
              </Button>
            </Flex>
          </>
        ) : (
          <Box
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            pt="2rem"
          >
            <Text fontSize="2xl">Your cart is empty</Text>
            <Link to="/">
              <Text className="link" fontSize="xl">
                Go Back
              </Text>
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};

/*
<Box maxW="800px" mx="auto" background="red.500">
          <Box mt="2rem" w="100%">
            <h2>something else</h2>
          </Box>
        </Box>
<VStack width="100%" mt="1rem" spacing="10px" align="flex-start">
          {items && items.length > 0 ? (
            <>
              {items.map((item) => (
                <CheckoutItem key={item.uuid} item={item} />
              ))}
            </>
          ) : (
            <Box p="2rem" textAlign="center">
              <Text as="h2" fontSize="xl">
                Your chart is empty!{" "}
              </Text>

              <Link to="/">
                <Text cursor="pointer" className="link" as="span">
                  Go Back
                </Text>
              </Link>
            </Box>
          )}
        </VStack>
 */
