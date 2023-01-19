import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../services/axios";
import { AddUpdateEventModal } from "./AddUpdateEventModal";
import { EventCard } from "./EventCard";

export const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    fetchEvents();
    isMounted.current = true;
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    axiosInstance
      .get("/event/")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container mt={9}>
      <AddUpdateEventModal onSuccess={fetchEvents} />
      {loading ? (
        <Center mt={6}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="green.200"
            color="green.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box mt={6}>
          {events?.map((event) => (
            <EventCard event={event} key={event.event_id} />
          ))}
        </Box>
      )}
    </Container>
  );
};
