import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchArticle, fetchComments } from '../api';

const Article = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);
    const [artLoading, setArtLoading] = useState(true);
    const [comLoading, setComLoading] = useState(true);

    useEffect(() => {
        fetchArticle(article_id).then((data) => {
        setArticle(data);
        setArtLoading(false);
        })
    }, [article_id, setArtLoading]);

    useEffect(() => {
        fetchComments(article_id).then((data) => {
        setComments(data);
        setComLoading(false);
        })
    }, [article_id, setComLoading]);

    if (artLoading) {
        return <p>Loading...</p>
    }

    if (comLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <section className={'singleArticle'}>
                <h2>{article.title}</h2>
                <p>Written by {article.author}</p>
                <img src={article.article_img_url} alt={`${article.topic}`} className={'responsiveImg'}></img>
                <p>{article.body}</p>
                <p>Topic: {article.topic}</p>
                <p><button>+</button> Votes: {article.votes} <button>-</button></p>
            </section>
            <section>
            <h2>Comments</h2>
            <ul className={'comments'}>
           {comments.map((comment) => {
            return <li className='comment' key={comment.article_id}>
                <p className={'commentBody'}>"{comment.body}"</p>
                <p>Comment posted by {comment.author} at {comment.created_at}</p>
                </li>
           })}
        </ul>
            </section>
        </div>
    );
};

export default Article;