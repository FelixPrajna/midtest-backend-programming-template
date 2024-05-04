const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');

module.exports = (app) => {
  app.use('/users', router);

  // Get list of users
  router.get('/', authenticationMiddleware, usersControllers.getUsers);

  // Create user
  router.post(
    '/',
    authenticationMiddleware,
    celebrate(usersValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  router.get('/:id', authenticationMiddleware, usersControllers.getUser);

  // Update user
  router.put(
    '/:id',
    authenticationMiddleware,
    celebrate(usersValidator.updateUser),
    usersControllers.updateUser
  );

  // Delete user
  router.delete('/:id', authenticationMiddleware, usersControllers.deleteUser);

  // Change password
  router.post(
    '/:id/change-password',
    authenticationMiddleware,
    celebrate(usersValidator.changePassword),
    usersControllers.changePassword
  );

  // Create purchase
  router.post(
    '/purchases/:id',
    authenticationMiddleware,
    celebrate(usersValidator.createPurchase),
    usersControllers.createPurchase
  );

  // Create Products
  router.post(
    '/product',
    authenticationMiddleware,
    usersControllers.createProducts
  );

  // Get list of products
  router.get(
    '/product/:id',
    authenticationMiddleware,
    usersControllers.getProduct
  );

  // Update product
  router.put(
    '/products/:id',
    authenticationMiddleware,
    celebrate(usersValidator.updateProduct),
    usersControllers.updateProduct
  );

  // Delete product
  router.delete(
    '/products/:id',
    authenticationMiddleware,
    usersControllers.deleteProduct
  );
};
