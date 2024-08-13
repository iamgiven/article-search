const express = require('express');
const Article = require('../models/articleModel');
const router = express.Router();

router.get('/articles', async (req, res) => {
  try {
    console.log("Fetching all articles...");
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send(error);
  }
});

router.get('/search', async (req, res) => {
  const query = req.query.q;
  
  try {
    console.log("Searching articles with query:", query);

    // Pencarian sederhana menggunakan regex pada semua field
    const searchQuery = {
      $or: [
        { title: { $regex: new RegExp(query, 'i') } },
        { content: { $regex: new RegExp(query, 'i') } },
        { author: { $regex: new RegExp(query, 'i') } },
        { tags: { $regex: new RegExp(query, 'i') } },
        { category: { $regex: new RegExp(query, 'i') } }
      ]
    };

    const articles = await Article.find(searchQuery);
    
    console.log(`Found ${articles.length} articles`);
    
    // Log judul artikel yang ditemukan
    articles.forEach(article => {
      console.log(`Matched article: ${article.title}`);
    });

    res.json(articles);
  } catch (error) {
    console.error('Error searching articles:', error);
    res.status(500).send(error);
  }
});

module.exports = router;