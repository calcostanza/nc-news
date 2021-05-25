import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleArticle } from '../utils/api';
import Comments from './Comments';

const SingleArticle = ({ user }) => {
  const [article, setArticle] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    getSingleArticle(article_id).then((articlesFromApi) => {
      setArticle(articlesFromApi);
    });
  }, [article_id]);

  return (
    <article className="articles">
      <section className="article--section">
        <h2> {article.title} </h2>
        <p>{article.body}</p>
        <p>Posted by: {article.author}</p>
        <p>Votes: {article.votes}</p>
        <p>{article.created_at}</p>
        <p>Total Comments: {article.comment_count}</p>
        <p>Comments</p>
        <Comments article={article} />
      </section>
    </article>
  );
};

export default SingleArticle;
