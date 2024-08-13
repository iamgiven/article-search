const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
  content: String,
  tags: [String],
  category: String,
  image: String
});

articleSchema.index({
  title: 'text',
  content: 'text',
  tags: 'text',
  category: 'text'  // Menambahkan category ke indeks teks
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;