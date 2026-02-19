const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resume_analyzer';

const options = {
  serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error('❌Error connecting to MongoDB:', err.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check MongoDB Atlas Network Access - whitelist your IP or use 0.0.0.0/0');
    console.log('2. Verify your cluster is active (not paused)');
    console.log('3. Check your username/password in the connection string');
  });

module.exports = mongoose; 