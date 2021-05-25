import { useEffect, useState } from 'react';
import { getArticleComments } from '../utils/api';
import { useParams } from 'react-router';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [article_id]);

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id} className="commentsList">
            <p>Posted by: {comment.author}</p>
            <p>Posted: {comment.created_at}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Comments;
