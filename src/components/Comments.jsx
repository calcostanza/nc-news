import { useEffect } from 'react';
import { getArticleComments } from '../utils/api';
import { useParams } from 'react-router';
import moment from 'moment';

const Comments = ({ comments, setComments }) => {
  const { article_id } = useParams();

  useEffect(() => {
    getArticleComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [article_id, setComments]);

  return (
    <section>
      <ul>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id} className="single--article--comments">
              <li className="commentsList">
                <p>
                  <strong>{comment.author}</strong> posted{' '}
                  {moment(comment.created_at).fromNow()}
                </p>
                <p>{comment.body}</p>
                <p>
                  <strong>Likes:</strong> {comment.votes}
                </p>
              </li>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
