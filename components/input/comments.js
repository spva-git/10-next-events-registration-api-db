import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const [isCommentsLoading, setIsCommentsLoading] = useState(null);
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(()=> {
    if(showComments) { 
      setIsCommentsLoading(true);
      fetch("/api/comments/"+eventId)  
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
        setIsCommentsLoading(false);
      })
    }
  },[showComments])
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) { 
    notificationCtx.showNotification({
      title: 'Sending comments',
      message: 'Your comments being stored.',
      status: 'pending'
    })
    fetch("/api/comments/"+eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if(response.ok) {
          return response.json()
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!')
        })
      })
      .then((data) => {
        setComments(data.comments)
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comments are saved.',
          status: 'success'
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Somethign went wrong',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isCommentsLoading && <CommentList items={comments} />}
      {showComments && isCommentsLoading && <p>Loading...</p>}

    </section>
  );
}

export default Comments;
