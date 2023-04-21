import Header from "./components/header";
import Articles from "./components/articles";
import Article from "./components/article";
import {Routes, Route} from 'react-router-dom';
import './App.css';
import { useState, useEffect } from "react";
import { fetchArticles } from './api';
import { UserProvider } from "./contexts/user";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((data) => {
    setArticles(data);
    setLoading(false);
    })
}, [setArticles]);

  return (
    <div className="App">
      <Header />
      <UserProvider>
      <Routes>
      <Route path="/" element={<Articles articles={articles} loading={loading}/>}/>
      <Route path="/articles/:article_id" element={<Article />}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
