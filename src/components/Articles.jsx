import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import { Link, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

const Articles = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortByQuery, setSortByQuery] = useState('created_at');
  const { urlTopic } = useParams();
  const history = useHistory();

  useEffect(() => {
    getArticles(urlTopic, sortOrder, sortByQuery)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      })
      .catch(() => setError(true));
  }, [urlTopic, sortOrder, sortByQuery]);

  if (error) {
    return (
      <>
        <h3>Topic not found!</h3>
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
    <>
      <div>
        <button onClick={() => setSortOrder('asc')}>Sort by Ascending</button>
        <button onClick={() => setSortOrder('desc')}>Sort by Descending</button>
        <button onClick={() => setSortByQuery('topic')}>Sort by Topic</button>
        <button onClick={() => setSortByQuery('votes')}>Sort by Likes</button>
        <button onClick={() => setSortByQuery('created_at')}>
          Sort by Date
        </button>{' '}
      </div>
      <div className="articles">
        {articles.map((article) => {
          const {
            article_id,
            title,
            author,
            comment_count,
            created_at,
            body,
            votes,
          } = article;
          return (
            <div className="article--section" key={article_id}>
              <ul className="Article--preview__footer">
                <li>Posted by: {author}</li>
                <li>{moment(created_at).fromNow()}</li>
              </ul>
              <Link to={`/articles/${article_id}`} className="Article--Main">
                <h2 className="Article--title">{title}</h2>
                <section className="Article--data">
                  <strong>
                    <p className="Article__preview">{`${body.substr(
                      0,
                      100
                    )}...`}</p>
                  </strong>
                </section>
              </Link>
              <ul className="Article--preview--top__footer">
                <li>Comments: {comment_count}</li>
                <li>Likes: {votes}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Articles;
