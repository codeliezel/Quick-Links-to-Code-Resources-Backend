import mongoose from 'mongoose';

require('dotenv').config();

const devUri = process.env.DEV_DATABASE_URI;
const testUri = `mongodb+srv://${process.env.name}:${process.env.password}@${process.env.database}/${process.env.dbtable}?retryWrites=true&w=majority`;

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

