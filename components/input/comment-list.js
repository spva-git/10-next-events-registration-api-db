import classes from "./comment-list.module.css";

function CommentList(props) {
  const { items } = props; console.log('items',items);
  return (
    <ul className={classes.comments}>
      {items && items.map((item) => (
        <li key={item.id}>
          <p>{item.text}!</p>
          <div>
            By <displayName>{item.name}</displayName>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
