import { getFilteredEvents } from "../../helpers/api-util";
import styles from "@/styles/Home.module.css";
import EventList from "@/components/events-list";
import ResultsTitle from "@/components/event-detail/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-d7dfe-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (let key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!filterData) {
    return <p className="center">Loading..</p>;
  }

  const numYear = +filterData[0];
  const numMonth = +filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No events found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Back to all Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <main className={styles.main}>
        <h1>The Filtered events</h1>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </main>
    </>
  );
}

/*export async function getServerSideProps(context) {
  const { params } = context;

  const filteredData = params.slug;

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  if (isNaN(numYear) || isNaN(numMonth)) {
    return { props: { hasError: true } };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}*/

export default FilteredEventsPage;
