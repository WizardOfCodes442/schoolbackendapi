// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Load environment variables from a .env file if needed
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Load routes
const studentRoutes = require('./routes/studentRoutes');
const profileRoutes = require('./routes/profileRoutes');
const biodataRoutes = require('./routes/biodataRoutes');
const waecRoutes = require('./routes/waecRoutes');
const necoRoutes = require('./routes/necoRoutes');
const jambRoutes = require('./routes/jambRoutes');
const courseregRoutes = require('./routes/courseregRoutes');

// Use routes
app.use('/portal/students', studentRoutes);
app.use('/portal/students', profileRoutes);
app.use('/portal/students', biodataRoutes);
app.use('/portal/students', waecRoutes);
app.use('/portal/students', necoRoutes);
app.use('/portal/students', jambRoutes);
app.use('/portal/students', courseregRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
