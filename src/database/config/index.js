import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const prodUri = process.env.PROD_DATABASE_URI;
const devUri = process.env.DEV_DATABASE_URI;
const testUri = `mongodb+srv://${process.env.name}:${process.env.password}@${process.env.database}/${process.env.dbtable}`;

// connection for the dev environment
if (process.env.NODE_ENV === 'development') {
  mongoose.connect(devUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to database!');
    })
    .catch((error) => {
      console.log('Connection failed!');
      console.log(error);
    });
}

// connection for the test environment
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(testUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to database!');
    })
    .catch((error) => {
      console.log('Connection failed!');
      console.log(error);
    });
}

// connection for the production environment
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(prodUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Connected to prod database!');
    })
    .catch((error) => {
      console.log('Connection failed!');
      console.log(error);
    });
}
