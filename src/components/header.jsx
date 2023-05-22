import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

const Header = () => {
    return (
        <header>
            <Link to={`/`}><button className="home-button"> <FaHome /> </button></Link>
            <Link to={`/topics`}><button className="topics-button"> Topics </button></Link>
            <h1 className="h1">NC</h1>
            <h1 className="h2">NEWS</h1>
        </header>
        
    );
};

export default Header;
