const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let isConnected = false;
let mongoServer;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Primary MongoDB connection failed: ${error.message}`);
    console.log('Starting in-memory MongoDB server...');

    try {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      isConnected = true;
      console.log(`In-memory MongoDB Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`In-memory MongoDB failed: ${memError.message}`);
      console.error('Server will start without database connection.');
    }
  }
};

const getConnectionStatus = () => isConnected;

module.exports = connectDB;
module.exports.getConnectionStatus = getConnectionStatus;
