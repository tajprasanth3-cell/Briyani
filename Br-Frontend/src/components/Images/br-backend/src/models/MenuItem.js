const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        'Chicken Biryani',
        'Mutton Biryani',
        'Fish Biryani',
        'Prawn Biryani',
        'Egg Biryani',
        'Starters',
        'Beverages',
        'Desserts',
        'Roti & Breads',
      ],
    },
    image: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
    isVegetarian: { type: Boolean, default: false },
    spiceLevel: { type: String, enum: ['Mild', 'Medium', 'Spicy'], default: 'Medium' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
