import { useEffect, useState } from 'react';
import { getArticles } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import VoteArticle from './VoteArticle';

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
          <div className="article--section" key={article_id}>
            <Link to={`/articles/${article_id}`}>
              <section>
                <p>Posted by: {author}</p>
                <h2>{title}</h2>
                <p>Comments: {comment_count}</p>
              </section>
            </Link>
            <VoteArticle votes={votes} articles={articles} />
            <p>{created_at}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
