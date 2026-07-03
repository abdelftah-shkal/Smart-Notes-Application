/**
 * Workspace Flow — Database Configuration
 * @author Abdelfatah
 * Encapsulates the Mongoose connection logic.
 */

const mongoose = require('mongoose');
const { env } = require('./environment.config');

const connectDatabase = async () => {
  try {
    await mongoose.connect(env.DATABASE_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB connection lost');
});

module.exports = { connectDatabase };
