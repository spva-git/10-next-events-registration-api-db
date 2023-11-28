import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import Comments from "@/components/input/comments";

function EventDetailPage(props) {
  const event = props.event;

  if (!event) {
    return <div className="center">
      <p>Loading</p>;
    </div>
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;

  const eventDetail = await getEventById(eventId); 
  return {
    props: {
      event: eventDetail,
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map(event => ({
    params: { eventId: event.id },
  }));

  return {
    paths:paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
