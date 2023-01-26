import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ThemeToggler } from "../Theme/ThemeToggler";

export const NavBar = () => {
  const { logout } = useAuth();
  return (
    <Box minHeight="100vh">
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg={useColorModeValue("green.300", "green.600")}
        color="white"
      >
        <Link to="/">
          <Text as="h2" fontSize={24} fontWeight="bold">
            EVENT TRACKER
          </Text>
        </Link>
        <Stack direction="row" align="center" spacing={4}>
          {/* <Link to="/friends">
            <Text as="h2" fontSize={24} fontWeight="bold">
              Friends
            </Text>
          </Link> */}
          <ThemeToggler size="lg" />
          <Button onClick={logout} colorScheme="green">
            Logout
          </Button>
        </Stack>
      </Flex>
      <Outlet />
    </Box>
  );
};
