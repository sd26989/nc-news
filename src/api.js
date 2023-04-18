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