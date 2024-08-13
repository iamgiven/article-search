import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Docs from './pages/Docs'

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Helmet>
              <title>Search Document</title>
            </Helmet>
            <Navbar />
            <Home />
          </>
        } />
        <Route path="/docs" element={
          <>
            <Helmet>
              <title>All Articles</title>
            </Helmet>
            <Navbar />
            <Docs />
          </>
        } />
        <Route path="/*" element={
          <div className="w-screen h-screen flex flex-col items-center justify-center px-28 gap-4">
            <img className='w-[100px]' src="404.webp" alt="Not found" />
            <code className="text-xl text-gray-600 font-semibold">404 Not Found</code>
          </div>
        } />
      </Routes>
    </Router>
  );

};


export default App;