
const Articles = ({ articles, loading }) => {
    
    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h2>All Articles</h2>

            <ul className='allArticles'>
           {articles.map((article) => {
            return <li className='articles' key={article.article_id}>
                <h2>{article.title} </h2>
                <img src={article.article_img_url} alt={`${article.topic}`} className={'responsiveImg'}></img>
                <p>Written by {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments:{article.comment_count}</p>
                </li>
           })}
        </ul>

        </main>
    );
};

export default Articles;