import mongoose from 'mongoose';
import '../../config/index';

require('dotenv').config();

const devUri = process.env.DEV_DATABASE_URI;


mongoose
  .connect(devUri,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((error) => {
    console.log('Connection failed!');
    console.log(error);
  });

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
