import Header from "./components/header";
import Articles from "./components/articles";
import {Routes, Route} from 'react-router-dom';
import './App.css';
import { useState, useEffect } from "react";
import { fetchArticles } from './api';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then((data) => {
    setArticles(data);
    })
}, );

  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<Articles articles={articles}/>}/>
      </Routes>
    </div>
  );
}

export default App;
