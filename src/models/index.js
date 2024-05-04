const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const purchaseSchema = require('./purchase-schema');
const productsSchema = require('./products-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const Purchase = mongoose.model('purchase', mongoose.Schema(purchaseSchema));
const Products = mongoose.model('products', mongoose.Schema(productsSchema));

module.exports = {
  mongoose,
  User,
  Purchase,
  Products,
};
