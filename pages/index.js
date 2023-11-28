import classes from '@/styles/Home.module.css'
import EventList from '@/components/events-list';
import { getFeaturedEvents } from '../helpers/api-util';
import NewsletterRegistration from '@/components/input/newsletter-registration';

function HomePage(props) {
  const featuredEvents = props.events; 
  return (
    <>
      <main className={classes.main}>
        <h1>Featured Events</h1>
        <NewsletterRegistration />
        <EventList items={featuredEvents} />
      </main>
    </>
  )
}

export default HomePage;

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}