require('dotenv').config(); //to make db connection string
const connectDB = require('./db/connect'); //db connection
const Product = require('./models/product'); //document model
const jsonProduct = require('./products.json'); // list of data to automate

//start function is to start the db connection and to load the data
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('DB ready to load data..........');
    await Product.deleteMany();
    console.log('DB deleted all data..........');
    await Product.create(jsonProduct);
    console.log('DB created all data..........');
    console.log('ok..........');
    process.exit(0); //exit globally -- 0 passed - everything went well as per the logic
  } catch (error) {
    console.log('ERROR>>>', error);
    process.exit(1); //exit globally -- 1 passed - everything not went well as per the logic
  }
};
start();

//before we passing the exit the node will let to continue the process/ can see in the terminal the node will be running even after the db data is populated. but we dont want that because we are deleting the data after that creating it so each time we rerun this populate file it repeats so we should use the global variable to stop it
