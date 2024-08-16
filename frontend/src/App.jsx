import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Docs from './pages/Docs'
import ArticleDetail from './pages/ArticleDetail';
import User from './pages/User'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Upload from './pages/Upload'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
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
        <Route path="/article/:id" element={
          <>
            <Helmet>
              <title>Article Detail</title>
            </Helmet>
            <Navbar />
            <ArticleDetail />
          </>
        } />
        <Route path="/user" element={
          <ProtectedRoute>
            <Helmet>
              <title>User page</title>
            </Helmet>
            <Navbar />
            <User />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <RedirectIfAuthenticated>
            <Helmet>
              <title>Login page</title>
            </Helmet>
            <Login />
          </RedirectIfAuthenticated>
        } />
        <Route path="/signup" element={
          <RedirectIfAuthenticated>
            <Helmet>
              <title>Signup page</title>
            </Helmet>
            <Signup />
          </RedirectIfAuthenticated>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <Helmet>
              <title>Upload page</title>
            </Helmet>
            <Navbar />
            <Upload />
          </ProtectedRoute>
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