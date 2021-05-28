import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import VoteArticle from './VoteArticle';

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
        const { article_id, title, votes, author, comment_count, created_at } =
          article;
        return (
          <div className="article--section" key={article_id}>
            <Link to={`/articles/${article_id}`}>
              <section>
                <p>Posted by: {author}</p>
                <h2>{title}</h2>
                <p>Comments: {comment_count}</p>
              </section>
            </Link>
            <VoteArticle article_id={article_id} votes={votes} />
            <p>{created_at}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
