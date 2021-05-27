import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://post-site-app.herokuapp.com/api',
});

export const getTopics = async () => {
  const { data } = await newsApi.get('/topics');

  return data.topics;
};

export const getArticles = async (topic) => {
  const { data } = await newsApi.get('/articles', {
    params: {
      topic: topic,
    },
  });
  return data.articles;
};

export const getSingleArticle = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}`);
  return data.article;
};

export const getArticleComments = async (article_id) => {
  const { data } = await newsApi.get(`/articles/${article_id}/comments`);
  return data.comments;
};

export const postComment = async (article_id, body) => {
  const { data } = await newsApi.post(`/articles/${article_id}/comments`, body);
  return data.comment;
};

export const AddVote = async (article_id, votes) => {
  const { data } = await newsApi.patch(`/articles/${article_id}`, votes);
  return data.article;
};
