import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const FriendDetail = () => {
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  const onSubmit = async (values) => {
    if (values.friendID != user.username) {
      if (user.friends.includes(values.friendID)) {
        console.log("friend already added");
      } else {
        console.log("add new friend");
        user.friends.push(values.friendID);
      }
    } else {
      console.log("cannot add yourself as friend");
    }

    console.log(user.friends);

    try {
      await console.log(values.friendID);
    } catch (error) {
      toast({
        title: "No valid Friend ID found",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Text as="h1" fontSize={36} fontWeight="bold" user={user}>
        my ID: {user?.username}
      </Text>
      <br />
      <Text as="h1" fontSize={36} fontWeight="bold">
        Friends
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.friendID}>
          <Input
            placeholder="Friend ID"
            background={useColorModeValue("gray.300", "gray.600")}
            type="str"
            size="lg"
            mt={6}
            {...register("friendID", {
              required: "This is a required field",
            })}
          />
          <FormErrorMessage>
            {errors.friendID && errors.friendID.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          isLoading={isSubmitting}
          loadingText="Submitting..."
          colorScheme="green"
          variant="outline"
          mt={6}
          mb={6}
          type="submit"
        >
          Add Friend
        </Button>
      </form>
    </>
  );
};
