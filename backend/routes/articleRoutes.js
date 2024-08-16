const express = require('express');
const Article = require('../models/articleModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new article
router.post('/articles', auth, async (req, res) => {
  try {
    const article = new Article({
      ...req.body,
      user: req.user._id,
      _id: `article_${Date.now()}` // generate unique ID
    });
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all articles for the logged-in user
router.get('/my-articles', auth, async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user._id });
    res.send(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get 3 random articles
router.get('/random-articles', async (req, res) => {
  try {
    const count = await Article.countDocuments();
    const random = Math.floor(Math.random() * (count - 3));
    const articles = await Article.find().skip(random).limit(3);
    res.json(articles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an article
router.patch('/articles/:id', auth, async (req, res) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an article
router.delete('/articles/:id', auth, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all articles (public)
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

// Get a specific article
router.get('/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send();
    }
    res.json(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Search articles (public)
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    console.log("Searching articles with query:", query);

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