import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import './database/config/index';
import router from './routes';

require('dotenv').config();

const index = express();

index.use(cors());
index.use(express.json());
index.use('/api/v1/', router);

index.get('/', (req, res) => {
  res.status(200)
    .json({
      status: 200,
      message: 'Hello! I am the back-end of Quick Links to Code Resources project.',
    });
});

index.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'This route does not exist.',
  });
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const port = process.env.PORT || 5000;

index.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

export default index;
