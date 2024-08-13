import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (searchQuery) => {
    axios.get(`http://localhost:5000/search?q=${searchQuery}`)
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error('There was an error searching for articles!', error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setQuery(category);
    handleSearch(category);
  };

  useEffect(() => {
    if (selectedCategory) {
      handleSearch(selectedCategory);
    }
  }, [selectedCategory]);

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
          onKeyDown={handleKeyDown}
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
            className={`w-[60px] p-2 grid place-items-center ${selectedCategory === category ? 'bg-slate-200 rounded' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            <img src={`${category.toLowerCase()}.png`} alt={category} />
            <p className="text-gray-500 text-sm">{category}</p>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="max-w-[90%] xl:max-w-[70%] mt-10 xl:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map(article => (
          <div key={article._id} className="border border-[#ddd] rounded-lg shadow overflow-hidden aspect-square">
            <img className="w-full h-1/2 object-cover" src={article.image} alt={article.title}/>
            <div className="w-full h-1/2 p-3 xl:px-4 xl:py-2 ">
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

export default Home;