import classes from '@/styles/Home.module.css'
import EventList from '@/components/events-list';
import { getFeaturedEvents } from '@/dummy.data';

function HomePage() {
  const featuredEvents = getFeaturedEvents();
  return (
    <>
      <main className={classes.main}>
        <h1>Featured Events</h1>
        <EventList items={featuredEvents} />
      </main>
    </>
  )
}

export default HomePage;