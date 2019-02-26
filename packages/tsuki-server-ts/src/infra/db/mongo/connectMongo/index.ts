import mongoose from 'mongoose';

export const connectMongo = async (CONNECTION_URI: string): Promise<void> => {
  try {
    // Fix Depreication Warning
    mongoose.set('useFindAndModify', false);
    // Connect to MongoDB
    await mongoose.connect(CONNECTION_URI, { useNewUrlParser: true });
    console.log('MongoDB Connected...');
  } catch (exception) {
    // Log Exception
    console.error(exception);
    throw exception;
  }
};
