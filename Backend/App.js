// app.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectToDB } from './src/Db/Db.js';


import morgan from 'morgan';
import AdminRoutes from './src/Routes/Admin.routes.js';

dotenv.config();
const app = express();
connectToDB();
const corsOptions = {

  credentials: true,
};
// Middleware
app.use(cors( corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Test Route
app.get('/', (req, res) => {
  console.log('Request Received');
  res.send('Hello world');
});

app.use('/api/blogs', AdminRoutes);




export default app;