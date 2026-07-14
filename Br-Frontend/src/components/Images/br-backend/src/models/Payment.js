const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    method: {
      type: String,
      required: true,
      enum: ['cash', 'card', 'online', 'upi'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
