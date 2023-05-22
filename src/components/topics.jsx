import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopics } from '../api';

const Topics = () => {

    const [topics, setTopics] = useState([])
    const [loading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchTopics()
        .then((data) => {
            setIsLoading(false)
            setTopics(data)
        })
    }, [])
    
    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <main>
            <h2>All Topics</h2>

            <ul className='allTopics'>
           {topics.map((topic) => {
            return <div className="topics">
            <li className='card' key={topic.slug}>
                <Link to={`/?topic=${topic.slug}`}><h2>#{topic.slug}</h2></Link>
                </li>
                </div>
           })}
        </ul>

        </main>
    );
};

export default Topics;