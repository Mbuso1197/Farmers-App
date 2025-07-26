// server.js

const express = require('express');
const path = require('path');
const app = express();

// Middleware to serve static files from 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to serve the homepage (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Add more routes if needed (e.g. for dashboard, market, etc.)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Farmers App is running at http://localhost:${PORT}`);
});