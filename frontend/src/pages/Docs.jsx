import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Docs = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/articles')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  }, []);

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <main className="w-full my-20 xl:my-40 grid place-items-center">
        <div className="w-full max-w-[90%] my-4 xl:max-w-[70%]">
            <p className="text-base xl:text-xl font-semibold">Seluruh Artikel</p>
        </div>
        <div className="max-w-[90%] xl:max-w-[70%] grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          {articles.map(article => (
            <div
              key={article._id}
              className="border border-[#ddd] rounded-lg shadow overflow-hidden aspect-square cursor-pointer"
              onClick={() => handleArticleClick(article._id)}
            >
              <img className="w-full h-1/2 object-cover" src={article.image} alt={article.title}/>
              <div className="w-full h-1/2 p-3 xl:p-4">
                <h2 className="text-lg font-semibold xl:text-lg line-clamp-2">{article.title}</h2>
                <p className="text-sm xl:text-base text-gray-600">by {article.author}</p>
                <p className="text-sm xl:text-sm mt-2 xl:mt-1 line-clamp-3">{article.content}</p>
              </div>
            </div>
          ))}
        </div>
    </main>
  );
}

export default Docs;
