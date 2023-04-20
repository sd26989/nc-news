import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchArticle, fetchComments, patchArticleVotes } from '../api';

const Article = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [artLoading, setArtLoading] = useState(true);
    const [comLoading, setComLoading] = useState(true);
    const [isError, setIsError] = useState(false);
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

    useEffect(() => {
        fetchComments(article_id).then((data) => {
        setComments(data);
        setComLoading(false);
        })
        .catch((err) => {
            setIsError(true)
        })
        .finally(() => {
            setComLoading(false)
        })
    }, [article_id, setComLoading]);

    const handleUpvoteClick = () => {
        setVotes(previousVotes => previousVotes + 1);
        setUpDisabled(true);
        patchArticleVotes(article_id, 1)
        .catch(() => {
          setIsError(true);
          setVotes(previousVotes => previousVotes - 1);
          setUpDisabled(false);
        });
      };

    const handleDownvoteClick = () => {
        setVotes(previousVotes => previousVotes - 1);
        setDownDisabled(true);
        patchArticleVotes(article_id, -1)
        .catch(() => {
          setIsError(true);
          setVotes(previousVotes => previousVotes + 1);
          setDownDisabled(false);
        });
      };

    if (artLoading) return <p>Loading...</p>
    if (comLoading) return <p>Loading...</p>

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
            +
          </button>
          <p className="article-votes">Votes: {votes}</p>
          <button
            className="downvote-button"
            disabled={downDisabled}
            onClick={handleDownvoteClick}
          >
            -
          </button>
            </section>
            <section>
            <h2>Comments</h2>
            {isError ? <p>There are no comments for this article!</p> : <ul className={'comments'}>
           {comments.map((comment) => {
            return <li className='comment' key={comment.comment_id}>
                <p className={'commentBody'}>"{comment.body}"</p>
                <p>Comment posted by {comment.author} at {comment.created_at}</p>
                </li>
           })}
        </ul>}
            </section>
        </div>
    );
};

export default Article;