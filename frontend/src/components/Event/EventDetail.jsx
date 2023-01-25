import {
  Button,
  Center,
  Container,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { AddUpdateEventModal } from "./AddUpdateEventModal";

export const EventDetail = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const background = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    if (isMounted.current) return;
    fetchEvent();
    isMounted.current = true;
  }, [eventId]);

  const fetchEvent = () => {
    setLoading(true);
    axiosInstance
      .get(`/event/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteEvent = () => {
    setLoading(true);
    axiosInstance
      .delete(`/event/${eventId}`)
      .then(() => {
        toast({
          title: "Event deleted successfully",
          status: "success",
          isClosable: true,
          diration: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: "Could not delete event",
          status: "error",
          isClosable: true,
          diration: 2000,
        });
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Container mt={6}>
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      </Container>
    );
  }

  return (
    <>
      <Container mt={6}>
        <Button
          colorScheme="gray"
          onClick={() => navigate("/", { replace: true })}
        >
          Back
        </Button>
      </Container>
      <Container
        bg={background}
        minHeight="7rem"
        my={3}
        p={3}
        rounded="lg"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize={22}>{event.title}</Text>
        <Text bg="gray.500" mt={2} p={2} rounded="lg">
          {event.description}, {event.eventdatetime}
        </Text>
        <AddUpdateEventModal
          my={3}
          editable={true}
          defaultValues={{
            title: event.title,
            description: event.description,
            eventdatetime: event.eventdatetime,
            location: event.location,
            status: event.status,
          }}
          onSuccess={fetchEvent}
        />
        <Button
          isLoading={loading}
          colorScheme="red"
          width="100%"
          onClick={deleteEvent}
        >
          Delete
        </Button>
      </Container>
    </>
  );
};
