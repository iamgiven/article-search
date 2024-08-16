import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recentArticles, setRecentArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(false);

  const handleSearch = (searchQuery) => {
    axios.get(`http://localhost:5000/search?q=${searchQuery}`)
      .then(response => {
        setResults(response.data);
        setShowArticles(true); // Show articles when search is performed
      })
      .catch(error => {
        console.error('There was an error searching for articles!', error);
      });
  };

  const handleCategoryClick = (category) => {
    if (selectedCategory === category && showArticles) {
      setShowArticles(false); // Toggle off if the same category is clicked again
    } else {
      setSelectedCategory(category);
      setQuery(category);
      handleSearch(category);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      handleSearch(selectedCategory);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchRecentArticles();
  }, []);

  const fetchRecentArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/random-articles');
      setRecentArticles(response.data);
    } catch (error) {
      console.error('Error fetching random articles:', error);
    }
  };

  return (
    <main className="w-screen my-20 xl:mt-4 flex items-center flex-col">
      {/* Search input */}
      <div className="w-[90%] xl:w-2/5 h-[40px] md:h-[50px] px-6 border-2 rounded-full flex justify-between items-center gap-2 relative bg-white shadow">
        <input
          className="w-[90%] h-5/6 text-sm lg:text-base"
          type="text"
          placeholder="Cari artikel..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        />
        <button
          className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] absolute right-1 bg-slate-200 rounded-full grid place-items-center"
          onClick={() => handleSearch(query)}
        >
          <svg className="w-[18px] xl:w-[24px] aspect-square" xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256">
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </button>
      </div>

      {/* Category buttons */}
      <div className="w-[90%] xl:w-[25%] mt-6 flex justify-evenly">
        {['Health', 'Tech', 'Science', 'Earth', 'Space'].map(category => (
          <button 
            key={category}
            className={`w-[60px] p-2 grid place-items-center ${selectedCategory === category && showArticles ? 'bg-slate-200 rounded' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            <img src={`${category.toLowerCase()}.png`} alt={category} />
            <p className="text-gray-500 text-sm">{category}</p>
          </button>
        ))}
      </div>

      {/* Display category title and articles */}
      {showArticles && (
        <div className="max-w-[90%] xl:max-w-[70%] mt-10 xl:mt-20">
          <h2 className="text-2xl font-bold mb-4">{selectedCategory} Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(article => (
              <a key={article._id} href={`/article/${article._id}`} className="border border-[#ddd] rounded-lg shadow overflow-hidden aspect-square block no-underline text-black">
                <img className="w-full h-1/2 object-cover" src={article.image} alt={article.title}/>
                <div className="w-full h-1/2 p-3 xl:px-4 xl:py-2 ">
                  <h2 className="text-lg font-semibold xl:text-lg line-clamp-2">{article.title}</h2>
                  <p className="text-sm xl:text-base text-gray-600">by {article.author}</p>
                  <p className="text-sm xl:text-sm mt-2 xl:mt-1 line-clamp-3">{article.content}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Random Articles */}
      <div className="w-full max-w-[90%] xl:max-w-[70%] mt-10">
        <h2 className="text-2xl font-bold mb-4">Random Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentArticles.map(article => (
            <a 
              key={article._id} 
              href={`/article/${article._id}`} 
              className="border border-[#ddd] rounded-lg shadow overflow-hidden aspect-square block no-underline text-black"
            >
              <img className="w-full h-1/2 object-cover" src={article.image} alt={article.title} />
              <div className="w-full h-1/2 p-3 xl:px-4 xl:py-2">
                <h2 className="text-lg font-semibold xl:text-lg line-clamp-2">{article.title}</h2>
                <p className="text-sm xl:text-base text-gray-600">by {article.author}</p>
                <p className="text-sm xl:text-sm mt-2 xl:mt-1 line-clamp-3">{article.content}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

    </main>
  );
}

export default Home;
