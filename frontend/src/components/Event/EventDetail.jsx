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
import { useAuth } from "../../hooks/useAuth";

export const EventDetail = () => {
  const { user } = useAuth();
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

  const joinEvent = () => {
    setLoading(true);
    if (event.participants.includes(user.username)) {
      console.log("Event already joined");
      setLoading(false);
    } else {
      event.participants.push(user?.username);
      console.log(event.participants);
      axiosInstance
        .patch(`/event/participants/${eventId}`, {
          participants: event.participants,
        })
        .then(() => {
          toast({
            title: "Event joined successfully",
            status: "success",
            isClosable: true,
            duration: 1000,
          });
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          toast({
            title: "Could not join event",
            status: "error",
            isClosable: true,
            duration: 1000,
          });
        })
        .finally(() => setLoading(false));
    }
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
        Participants <br />
        {event.participants}
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
          colorScheme="blue"
          width="100%"
          onClick={joinEvent}
        >
          Join
        </Button>
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
