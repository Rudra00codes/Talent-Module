import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>}
 */
const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/talent-platform';
    await mongoose.connect(mongoURI);
    if (process.env.NODE_ENV !== 'production') {
      console.log('MongoDB Connected');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB; 