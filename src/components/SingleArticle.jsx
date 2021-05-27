import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getSingleArticle } from '../utils/api';
import Comments from './Comments';
import AddComment from './AddComment';

const SingleArticle = ({ user }) => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
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
        <p>Likes: {article.votes}</p>
        <p>{article.created_at}</p>
        <p>Total Comments: {article.comment_count}</p>
        <p>Comments</p>
        <AddComment
          article_id={article_id}
          user={user}
          setComments={setComments}
        />
        <Comments
          article={article}
          comments={comments}
          setComments={setComments}
        />
      </section>
    </article>
  );
};

export default SingleArticle;
