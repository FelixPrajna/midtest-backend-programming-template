const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const { updateProduct } = require('./users-repository');
const { namaBarang } = require('../../../models/purchase-schema');
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports = {
  createUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('Password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },

  updateUser: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      email: joi.string().email().required().label('Email'),
    },
  },

  changePassword: {
    body: {
      password_old: joi.string().required().label('Old password'),
      password_new: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .min(6)
        .max(32)
        .required()
        .label('New password'),
      password_confirm: joi.string().required().label('Password confirmation'),
    },
  },
  createPurchase: {
    body: {
      namaBarang: joi.string().required().label('Barang'),
      amount: joi.number().min(1).required().label('Jumlah'),
      // Add additional validation if needed
    },
  },

  createProduct: {
    body: {
      namaBarang: joi.string().required().label('Barang'),
      amount: joi.number().min(1).required().label('Jumlah'),
      // Add additional validation if needed
    },
  },

  updateProduct: {
    body: {
      namaBarang: joi.string().label('Barang'),
      amount: joi.number().min(1).label('Jumlah'),
      // Add additional validation if needed
    },
  },

  updatePurchase: {
    body: {
      customer: joi.string().label('Customer'),
      barang: joi.string().label('Barang'),
      jumlah: joi.number().min(1).label('Jumlah'),
      // Add additional validation if needed
    },
  },

  // Define validation for getting list of products if needed
};
