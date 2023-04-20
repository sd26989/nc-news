import axios from 'axios';

const newsAPI = axios.create({
  baseURL: 'https://nc-news-q7vx.onrender.com/api'
});

export const fetchArticles = () => {
    return newsAPI.get(`/articles`)
    .then((response) => {
      return response.data.articles;
    });
}

export const fetchArticle = (article_id) => {
    return newsAPI.get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    });
}

export const fetchComments = (article_id) => {
    return newsAPI.get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    });
}

export const patchArticleVotes = (article_id) => {
    return newsAPI.patch(`/articles/${article_id}`, { inc_votes: 1 })
      .then(({data}) => {
       return data.article
      });
  };