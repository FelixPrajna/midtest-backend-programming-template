const { User } = require('../../../models');
const { Purchase } = require('../../../models');
const { fromUserId } = require('../../../models/purchase-schema');
const { Products } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

/**
 * Create new purchase
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createPurchase(
  purchaseId,
  fromUserId,
  namaBarang,
  amount,
  timestamp
) {
  return Purchase.create({
    purchaseId,
    fromUserId,
    namaBarang,
    amount,
    timestamp,
  });
}

/**
 * Create new products
 * @param {string} namaBarang - nama barang
 * @param {string} amount - total barangnya
 * @returns {Promise}
 */
async function createProducts(namaBarang, amount) {
  return Products.create({
    namaBarang,
    amount,
  });
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getProducts(id) {
  return Products.findById(id);
}

/**
 * Update existing product
 * @param {string} id - User ID
 * @param {string} namaBarang - Name
 * @param {string} amount - jumlah
 * @returns {Promise}
 */
async function updateProduct(id, namaBarang, amount) {
  return Products.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        namaBarang,
        amount,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Products.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  createPurchase,
  createProducts,
  getProducts,
  updateProduct,
  deleteProduct,
};
