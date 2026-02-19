const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 Testing MongoDB connection...');
console.log('Connection string:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));

const options = {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  w: 'majority'
};

mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log('🎉 Connection test passed!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Connection failed:', err.message);
    console.error('Error code:', err.code);
    console.error('Error syscall:', err.syscall);
    
    console.log('\n💡 Possible solutions:');
    console.log('1. Check if your MongoDB Atlas cluster is ACTIVE (not paused)');
    console.log('2. Verify credentials: username=bhalla, password=bhalla');
    console.log('3. Try restarting your cluster in MongoDB Atlas');
    console.log('4. Check if you have network restrictions/VPN blocking MongoDB Atlas');
    
    process.exit(1);
  });
