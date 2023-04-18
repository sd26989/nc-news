
const Articles = ({ articles }) => {

    return (
        <main>
            <h2>All Articles</h2>

            <ul className='allArticles'>
           {articles.map((article) => {
            return <section>
                <li className='articles' key={article.article_id}>
                <h2>{article.title} </h2>
                <img src={article.article_img_url} alt={''} className={'responsiveImg'}></img>
                <p>Written by {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments:{article.comment_count}</p>
                </li>
                </section>
           })}
        </ul>

        </main>
    );
};

export default Articles;