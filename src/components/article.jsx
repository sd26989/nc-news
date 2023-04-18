import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchArticle } from '../api';

const Article = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState({});
    const [artLoading, setArtLoading] = useState(true);

    useEffect(() => {
        fetchArticle(article_id).then((data) => {
        setArticle(data);
        setArtLoading(false);
        })
    }, [article_id, setArtLoading]);

    if (artLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <section>
                <h2>{article.title}</h2>
                <p>Written by {article.author}</p>
                <img src={article.article_img_url} alt={`${article.topic}`} className={'responsiveImg'}></img>
                <p>{article.body}</p>
                <p>Topic: {article.topic}</p>
                <p><button>+</button> Votes: {article.votes} <button>-</button></p>
            </section>
        </div>
    );
};

export default Article;