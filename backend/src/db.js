import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('Missing MONGO_URI in environment');
  process.exit(1);
}

mongoose.connect(uri, {
  autoIndex: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Mongo connection error:', err);
    process.exit(1);
  });
