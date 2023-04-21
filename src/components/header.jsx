import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <h1>NC News</h1>
            <Link to={`/`}><button className="home-button"> <FaHome /> </button></Link>
            <Link to={`/topics`}><button className="topics-button"> Topics </button></Link>
        </header>
        
    );
};

export default Header;
