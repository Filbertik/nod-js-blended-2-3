// import mongoose from 'mongoose';
// import { env } from './env.js';

// export const connectMongo = async () => {
//   const user = env('MONGODB_USER');
//   const password = env('MONGODB_PASSWORD');
//   const host = env('MONGODB_URL');
//   const db = env('MONGO_DB');

//   const uri = `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority`;

//   try {
//     await mongoose.connect(uri);
//     console.log('Database connection successful');
//   } catch (error) {
//     console.error('Database connection error:', error.message);
//     process.exit(1);
//   }
// };
