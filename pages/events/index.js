import EventList from "@/components/events-list";
import { getAllEvents } from "@/dummy.data";
import styles from "@/styles/Home.module.css";
import EventsSearch from "@/components/event-detail/event-search";
import { useRouter } from "next/router";

function AllEventsPage() {
  const router = useRouter();
  const allEvents = getAllEvents();
  function findEventsHandler(year, month){
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <h1>All Events</h1>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList items={allEvents} />
    </>
  );
}

export default AllEventsPage;
