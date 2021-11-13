import express from 'express';
import mongoose from 'mongoose';
// import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

// routes
import authRoutes from './routes/api/auth';
import userRoutes from './routes/api/users';

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// Cors Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(express.json());

const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;