import axios from 'axios';

const newsAPI = axios.create({
  baseURL: 'https://nc-news-q7vx.onrender.com/api'
});

export const fetchArticles = (topic) => {
    return newsAPI.get('/articles', {params: {topic}})
    .then((response) => {
      return response.data.articles;
    });
}

export const fetchTopics = () => {
    return newsAPI.get(`/topics`)
    .then((response) => {
      return response.data.topics;
    });
}

export const fetchUsers = () => {
    return newsAPI.get(`/users`)
    .then((response) => {
      return response.data.users;
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

export const patchArticleVotes = (article_id, inc_votes) => {
    return newsAPI.patch(`/articles/${article_id}`, { inc_votes: inc_votes })
      .then(({data}) => {
       return data.article.votes
      });
  };

  export const postComment = (article_id, username, body) => {
    return newsAPI.post(`/articles/${article_id}/comments`, {username, body}).then(({data}) => {
        return data;
    })
    }