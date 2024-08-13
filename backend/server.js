const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const articleRoutes = require('./routes/articleRoutes');
require('dotenv').config();  // Memuat variabel lingkungan dari file .env

const app = express();
const PORT = process.env.PORT || 5000;  // Mendapatkan PORT dari variabel lingkungan atau menggunakan nilai default 5000

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Document Search API');
});

app.use('/', articleRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
