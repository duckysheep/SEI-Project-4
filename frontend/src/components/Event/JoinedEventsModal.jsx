import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { useAuth } from "../../hooks/useAuth";

export const JoinedEventsModal = ({
  editable = false,
  defaultValues = {},
  onSuccess = () => {},
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { eventId } = useParams();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...defaultValues },
  });
  const { user } = useAuth();

  // const [value, setValue] = useState("Anyone");

  const onSubmit = async (values) => {
    try {
      if (editable) {
        await axiosInstance.put(`/event/${eventId}`, values);
      } else {
        await axiosInstance.post(`/event/create/`, values);
      }
      toast({
        title: editable ? "Event Updated" : "Event Added",
        status: "success",
        isClosable: true,
        duration: 1000,
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong. Please try again.",
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  return (
    <Box {...rest}>
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {defaultValues.owner === user.username ? (
              <ModalHeader>
                {editable ? "UPDATE EVENT" : "ADD EVENT"}
              </ModalHeader>
            ) : (
              <ModalHeader>{editable ? "VIEW EVENT" : "ADD EVENT"}</ModalHeader>
            )}
            {/* <ModalHeader>{editable ? "UPDATE EVENT" : "ADD EVENT"}</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody>
              {defaultValues.owner === user.username ? (
                <FormControl isInvalid={errors.title}>
                  <Input
                    placeholder="Event Title...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("title", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Title must be at least 5 characters",
                      },
                      maxLength: {
                        value: 55,
                        message: "Title must be at most 55 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
              ) : (
                <FormControl isInvalid={errors.title} isReadOnly>
                  <Input
                    placeholder="Event Title...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="text"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("title", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Title must be at least 5 characters",
                      },
                      maxLength: {
                        value: 55,
                        message: "Title must be at most 55 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              {defaultValues.owner === user.username ? (
                <FormControl isInvalid={errors.eventdatetime}>
                  <Input
                    placeholder="Add date and time..."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="datetime-local"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("eventdatetime", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Date must be at least 1 characters",
                      },
                      maxLength: {
                        value: 755,
                        message: "Date must be at most 755 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.eventdatetime && errors.eventdatetime.message}
                  </FormErrorMessage>
                </FormControl>
              ) : (
                <FormControl isInvalid={errors.eventdatetime} isReadOnly>
                  <Input
                    placeholder="Add date and time..."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="datetime-local"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("eventdatetime", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Date must be at least 1 characters",
                      },
                      maxLength: {
                        value: 755,
                        message: "Date must be at most 755 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.eventdatetime && errors.eventdatetime.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              {defaultValues.owner === user.username ? (
                <FormControl isInvalid={errors.location}>
                  <Input
                    placeholder="Add location...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="test"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("location", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Location must be at least 1 characters",
                      },
                      maxLength: {
                        value: 755,
                        message: "Location must be at most 755 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.location && errors.location.message}
                  </FormErrorMessage>
                </FormControl>
              ) : (
                <FormControl isInvalid={errors.location} isReadOnly>
                  <Input
                    placeholder="Add location...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="test"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("location", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Location must be at least 1 characters",
                      },
                      maxLength: {
                        value: 755,
                        message: "Location must be at most 755 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.location && errors.location.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              {/* <RadioGroup
                name="joinPermission"
                onChange={setValue}
                value={value}
              >
                <Stack direction="row">
                  <Radio value="Anyone">Anyone</Radio>
                  <Radio value="Friends">Friends</Radio>
                </Stack>
              </RadioGroup> */}
              {defaultValues.owner === user.username ? (
                <FormControl isInvalid={errors.description}>
                  <Textarea
                    rows={5}
                    placeholder="Add description...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="test"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("description", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Description must be at least 1 characters",
                      },
                      maxLength: {
                        value: 755,
                        message: "Description must be at most 755 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              ) : (
                <FormControl isInvalid={errors.description} isReadOnly>
                  <Textarea
                    rows={5}
                    placeholder="Add description...."
                    background={useColorModeValue("gray.300", "gray.600")}
                    type="test"
                    variant="filled"
                    size="lg"
                    mt={6}
                    {...register("description", {
                      required: "This is a required field",
                      minLength: {
                        value: 1,
                        message: "Description must be at least 1 characters",
                      },
                      maxLength: {
                        value: 755,
                        message: "Description must be at most 755 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              )}
              {defaultValues.owner === user.username ? (
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormControl mt={6} display="flex" alignItems="center">
                      <FormLabel htmlFor="is-done">Status</FormLabel>
                      <Switch
                        onChange={(e) => field.onChange(e.target.checked)}
                        isChecked={field.value}
                        id="is-done"
                        size="lg"
                        name="status"
                        isDisabled={false}
                        isLoading={false}
                        colorScheme="green"
                        variant="ghost"
                      />
                    </FormControl>
                  )}
                />
              ) : (
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormControl
                      mt={6}
                      display="flex"
                      alignItems="center"
                      isReadOnly
                    >
                      <FormLabel htmlFor="is-done">Status</FormLabel>
                      <Switch
                        onChange={(e) => field.onChange(e.target.checked)}
                        isChecked={field.value}
                        id="is-done"
                        size="lg"
                        name="status"
                        isDisabled={false}
                        isLoading={false}
                        colorScheme="green"
                        variant="ghost"
                      />
                    </FormControl>
                  )}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button onClick={onClose} disabled={isSubmitting}>
                  Close
                </Button>
                {defaultValues.owner === user.username && (
                  <Button
                    colorScheme="green"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText={editable ? "Updating" : "Creating"}
                  >
                    {editable ? "Update" : "Create"}
                  </Button>
                )}
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
