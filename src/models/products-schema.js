const { Schema } = require('mongoose');

const productSchema = new Schema({
  namaBarang: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Jumlah tidak boleh negatif
  },
});

module.exports = productSchema;
