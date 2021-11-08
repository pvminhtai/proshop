require('dotenv').config();
const users = require('./data/user');
const Order = require('./database/models/order.model');
const Product = require('./database/models/product.model');
const User = require('./database/models/user.model');

const products = require('./data/products');

const connectDB = require('./loaders/mongoose');

connectDB();

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
