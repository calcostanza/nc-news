import { useEffect } from 'react';
import { getArticleComments } from '../utils/api';
import { useParams } from 'react-router';

const Comments = ({ comments, setComments }) => {
  const { article_id } = useParams();

  useEffect(() => {
    getArticleComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [article_id, setComments]);

  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.comment_id} className="commentsList">
            <p>Posted by: {comment.author}</p>
            <p>Posted: {comment.created_at}</p>
            <p>{comment.body}</p>
            <p>Likes: {comment.votes}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Comments;
