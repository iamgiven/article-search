import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div></div>;

  return (
    <main className="w-full my-20 xl:my-32 flex flex-col items-center">
      <article className="w-full max-w-[90%] xl:max-w-[50%] bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        {article.image && <img src={article.image} alt={article.title} className="w-full h-64 object-cover mb-4"/>}
        <p className="text-gray-600 mb-2">By {article.author}</p>
        <p className="text-gray-600 mb-4">Category: {article.category}</p>
        <p className="text-gray-800 mb-4">{article.content}</p>
        <p className="text-gray-600">Tags: {article.tags.join(', ')}</p>
      </article>
    </main>
  );
};

export default ArticleDetail;