import { Link } from "react-router-dom";
import { useState } from "react";
import { GoComment } from 'react-icons/go';
import { BiUpvote } from 'react-icons/bi';

const Articles = ({ articles, loading }) => {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  if (loading) {
    return <p>Loading...</p>;
  }

  const sortedArticles = articles.sort((a, b) => {
    let result = 0;
    if (sortBy === "date") {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      result = dateB - dateA;
    } else if (sortBy === "votes") {
      result = b.votes - a.votes;
    } else if (sortBy === "comments") {
        result = b.comment_count - a.comment_count;
      }

    if (sortOrder === "asc") {
      result *= -1;
    }
    return result;
  });

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <main>
      <div className ="sort-container">
        {/* <label htmlFor="sort">Sort By:</label> */}
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="date">Date</option>
          <option value="votes">Votes</option>
          <option value="comments">Comments</option>
        </select>
      </div>
      <div className="order-container">
        {/* <label htmlFor="order">Sort Order:</label> */}
        <select id="order" value={sortOrder} onChange={handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <ul className="allArticles">
        {sortedArticles.map((article) => {
          return (
            <li className="articles" key={article.article_id}>
              <Link to={`/articles/${article.article_id}`} className="articleLink">
                <h2>{article.title}</h2>
              </Link>
              <img
                src={article.article_img_url}
                alt={`${article.topic}`}
                className={"responsiveImg"}
              ></img>
              <p className="author">By {article.author}</p>
              <p><BiUpvote/> {article.votes} <GoComment/> {article.comment_count}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Articles;






