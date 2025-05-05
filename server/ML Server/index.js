const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Import routes
// const authRoutes = require('./routes/auth.route');
// const transactionRoutes = require('./routes/transactionRoute'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
// app.use('/api', authRoutes);
// app.use('/api', transactionRoutes);

app.use('/test', (req, res) => {
  res.json({ message: 'ML Server is working!' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
