const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/clothing-store');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Server will continue without database connection for development...');
    // Don't exit - allow server to start even if MongoDB is not available
    // This is helpful for frontend development
  }
};

module.exports = connectDB;

