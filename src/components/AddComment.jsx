import React, { useState } from 'react';
import { postComment } from '../utils/api';

const AddComment = ({ article_id, user, setComments }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, { username: user.username, body: newComment })
      .then((response) => {
        setComments((currComment) => {
          return [response, ...currComment];
        });
      })
      .catch((err) => console.log(err.response.data));
    setNewComment('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        ></input>
        <button>Add Comment</button>
      </form>
    </div>
  );
};

export default AddComment;
