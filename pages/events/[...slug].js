import { getFilteredEvents } from "@/dummy.data";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import EventList from "@/components/events-list";
import ResultsTitle from "@/components/event-detail/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import Link from "next/link";
import Button from "@/components/ui/button";

function FilteredEventsPage() {
  const router = useRouter();
  const filteredData = router.query.slug;
  if (!filteredData) {
    return <p className="center">Loading..</p>;
  }

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  if (isNaN(numYear) || isNaN(numMonth)) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid Filter.</p>
        </ErrorAlert>
        <Link href="/events">Back to all Events</Link>
      </>
    );
  }
  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No events found.</p>
        </ErrorAlert>
        <Button link="/events">Back to all Events</Button>
      </>
    );
  }
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

export default FilteredEventsPage;
