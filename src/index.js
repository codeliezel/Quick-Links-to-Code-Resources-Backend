import  express from 'express';
import cors from'cors';
import mongoose from 'mongoose';
import router from './routes/index';

require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, 
    { 
     useUnifiedTopology: true, 
     useNewUrlParser: true, 
     useCreateIndex: true,
    })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const port = process.env.PORT || 5000
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});