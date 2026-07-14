const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.menuItem');
    if (!cart) {
      return successResponse(res, { items: [] });
    }

    successResponse(res, cart);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity = 1 } = req.body;

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return errorResponse(res, 'Menu item not found', 404);
    }

    if (!menuItem.isAvailable) {
      return errorResponse(res, 'Menu item is currently unavailable', 400);
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ menuItem: menuItemId, quantity }],
      });

      await cart.populate('items.menuItem');
      return successResponse(res, cart, 'Item added to cart', 201);
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem._id.toString() === menuItemId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
    }

    await cart.save();
    await cart.populate('items.menuItem');

    successResponse(res, cart, 'Item added to cart');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return errorResponse(res, 'Cart not found', 404);
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.id
    );

    await cart.save();
    await cart.populate('items.menuItem');

    successResponse(res, cart, 'Item removed from cart');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getCart, addToCart, removeFromCart };
