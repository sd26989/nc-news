import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchArticle, patchArticleVotes } from '../api';
import Comments from ".//comments";
import { BiUpvote, BiDownvote } from 'react-icons/bi';

const Article = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState({});
    const [artLoading, setArtLoading] = useState(true);
    const [upDisabled, setUpDisabled] = useState(false);
    const [downDisabled, setDownDisabled] = useState(false);
    const [votes, setVotes] = useState(article.votes);

    useEffect(() => {
        fetchArticle(article_id).then((data) => {
        setArticle(data);
        setVotes(data.votes);
        setArtLoading(false);
        })
    }, [article_id, setArtLoading]);

    const handleUpvoteClick = () => {
        setVotes(previousVotes => previousVotes + 1);
        setUpDisabled(true);
        patchArticleVotes(article_id, 1)
        .catch(() => {
          setVotes(previousVotes => previousVotes - 1);
          setUpDisabled(false);
        });
      };

    const handleDownvoteClick = () => {
        setVotes(previousVotes => previousVotes - 1);
        setDownDisabled(true);
        patchArticleVotes(article_id, -1)
        .catch(() => {
          setVotes(previousVotes => previousVotes + 1);
          setDownDisabled(false);
        });
      };

    if (artLoading) return <p>Loading...</p>

    return (
        <div>
            <section className={'singleArticle'}>
                <h2>{article.title}</h2>
                <p>Written by {article.author}</p>
                <img src={article.article_img_url} alt={`${article.topic}`} className={'responsiveImg'}></img>
                <p>{article.body}</p>
                <p>Topic: {article.topic}</p>
                
          <button
            className="upvote-button"
            disabled={upDisabled}
            onClick={handleUpvoteClick}
          >
            <BiUpvote />
          </button>
          <p className="article-votes">Votes: {votes}</p>
          <button
            className="downvote-button"
            disabled={downDisabled}
            onClick={handleDownvoteClick}
          >
            <BiDownvote />
          </button>
            </section>
            <Comments article_id={article_id}/>
        </div>
    );
};

export default Article;