console.log('04 Store API');
require('dotenv').config(); //1.here we should set out .env file indside the root folder
require('express-async-errors');
//app
const express = require('express');
const app = express();
//db and router
const connectDB = require('./db/connect');
const ProductsRouter = require('./routes/products');
//middleware & folder
const notFoundMiddleware = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
app.use(express.json()); //to convert the json document i.e the content-type:json to text/readable format

//home route
app.get('/', (req, res) => res.send(`<h1>HELLO</h1><a href=/api/v1/products>products route</a> `));
//router
app.use('/api/v1/products', ProductsRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    //1.always keep the .env file in the root directry or connection db is not a string error occurs
    await connectDB(process.env.MONGO_URL);
    console.log('connected to DB... ');
    app.listen(port, () => {
      console.log(`listening to port ${port}.....`);
    });
  } catch (err) {
    console.log('Error:-', err);
  }
};

start();
