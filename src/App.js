import Header from "./components/header";
import Articles from "./components/articles";
import Article from "./components/article";
import Topics from "./components/topics";
import {Routes, Route} from 'react-router-dom';
import './App.css';
import { useState, useEffect } from "react";
import { fetchArticles } from './api';
import { UserProvider } from "./contexts/user";
import { useSearchParams } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");

  useEffect(() => {
    fetchArticles(topic).then((data) => {
    setArticles(data);
    setLoading(false);
    })
}, [topic, setArticles]);

  return (
    <div className="App">
      <Header />
      <UserProvider>
      <Routes>
      <Route path="/" element={<Articles articles={articles} loading={loading}/>}/>
      <Route path="/articles/:article_id" element={<Article />}/>
      <Route path="/topics" element={<Topics />}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
