import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import { Link, useParams } from 'react-router-dom';

const Articles = () => {
  const [error, setError] = useState(false);
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortByQuery, setSortByQuery] = useState('created_at');
  const { urlTopic } = useParams();

  useEffect(() => {
    getArticles(urlTopic, sortOrder, sortByQuery)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((err) => setError(true));
  }, [urlTopic, sortOrder, sortByQuery]);

  if (error) {
    return <h3>Topic not found!</h3>;
  }

  return (
    <div className="articles">
      <button onClick={() => setSortOrder('asc')}>Sort by Ascending</button>
      <button onClick={() => setSortOrder('desc')}>Sort by Descending</button>
      <button onClick={() => setSortByQuery('topic')}>Sort by Topic</button>
      <button onClick={() => setSortByQuery('votes')}>Sort by Likes</button>
      <button onClick={() => setSortByQuery('created_at')}>Sort by Date</button>
      {articles.map((article) => {
        const { article_id, title, author, comment_count, created_at, body } =
          article;
        return (
          <div className="article--section" key={article_id}>
            <Link to={`/articles/${article_id}`} className="Article--Main">
              <section>
                <h2 className="Article--title">{title}</h2>
                <p className="article__preview">{`${body.substr(
                  0,
                  100
                )}...`}</p>
                <p>Comments: {comment_count}</p>
              </section>
            </Link>
            <p>{created_at}</p>
            <p>Posted by: {author}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
