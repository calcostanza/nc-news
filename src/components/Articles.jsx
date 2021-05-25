import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import { Link, useParams } from 'react-router-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { urlTopic } = useParams();

  useEffect(() => {
    getArticles(urlTopic).then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, [urlTopic]);

  return (
    <div className="articles">
      {articles.map((articles) => {
        const { article_id, title, votes, author, comment_count, created_at } =
          articles;
        return (
          <Link to={`/articles/${article_id}`} key={article_id}>
            <section className="article--section">
              <p>Posted by: {author}</p>
              <h2>{title}</h2>
              <p>Comments: {comment_count}</p>
              <p>Votes: {votes}</p>
              <p>{created_at}</p>
            </section>
          </Link>
        );
      })}
    </div>
  );
};

export default Articles;
