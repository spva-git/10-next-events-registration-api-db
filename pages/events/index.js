import EventList from "@/components/events-list";
import { getAllEvents } from "../../helpers/api-util";
import EventsSearch from "@/components/event-detail/event-search";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const router = useRouter();
  const allEvents = props.events;

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

export async function getStaticProps(){
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents
    },
    revalidate: 60
  }
}

export default AllEventsPage;
