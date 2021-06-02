import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getSingleArticle } from '../utils/api';
import Comments from './Comments';
import AddComment from './AddComment';
import VoteArticle from './VoteArticle';
import moment from 'moment';

const SingleArticle = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const { article_id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getSingleArticle(article_id)
      .then((articlesFromApi) => {
        setArticle(articlesFromApi);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, [article_id]);

  if (error) {
    return (
      <>
        <h3>Article not found!</h3>
        <button
          onClick={() => {
            setError(false);
            history.push('/');
          }}
        >
          Reset search
        </button>
      </>
    );
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <article>
      <section className="single--article--section ">
        <h2> {article.title} </h2>
        <ul className="single-article--list" key={article.article_id}>
          <li>
            <strong>Posted by:</strong> {article.author}
          </li>
          <li>
            <strong>{moment(article.created_at).fromNow()}</strong>
          </li>
        </ul>
        <p className="single--article--body">{article.body}</p>
        <VoteArticle article_id={article_id} votes={article.votes} />
        <p></p>
      </section>
      <p></p>
      <AddComment
        article_id={article_id}
        user={user}
        setComments={setComments}
      />
      <div>
        <p>
          <strong>Comments</strong>
        </p>

        <Comments
          article={article}
          comments={comments}
          setComments={setComments}
        />
      </div>
    </article>
  );
};

export default SingleArticle;
