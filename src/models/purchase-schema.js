const mongo = require('mongoose');

const purchaseSchema = {
  purchaseId: String,
  fromUserId: {
    type: mongo.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  namaBarang: String,
  amount: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
};

module.exports = purchaseSchema;
