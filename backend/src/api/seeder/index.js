require('dotenv').config();
const users = require('./data/user');
const products = require('./data/products');

const { Order, Product, User } = require('../models');
const App = require('../../app');

const app = new App();
app.connectToDatabase();

const constData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => ({
      ...product,
      user: adminUser
    }));

    await Product.insertMany(sampleProducts);

    console.log('Data consted!');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed!');
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  constData();
}
