import classes from "./event-list.module.css";
import EventItem from "./event-item";

function EventList(props) {
  const { items } = props;
  return (
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
      <EventItem />
    </ul>
  );
}

export default EventList;
