const MenuItem = require('../models/MenuItem');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getMenuItems = async (req, res) => {
  try {
    const { category, isAvailable, isVegetarian, search, page = 1, limit = 50 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (isVegetarian !== undefined) filter.isVegetarian = isVegetarian === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const items = await MenuItem.find(filter).skip(skip).limit(Number(limit)).sort('category name');
    const total = await MenuItem.countDocuments(filter);

    successResponse(res, {
      items,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return errorResponse(res, 'Menu item not found', 404);
    }
    successResponse(res, item);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable, isVegetarian, spiceLevel } = req.body;
    const item = await MenuItem.create({
      name, description, price, category, image,
      isAvailable, isVegetarian, spiceLevel,
    });
    successResponse(res, item, 'Menu item created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updateMenuItem = async (req, res) => {
  try {
    const updates = {};
    const fields = ['name', 'description', 'price', 'category', 'image', 'isAvailable', 'isVegetarian', 'spiceLevel'];
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    const item = await MenuItem.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return errorResponse(res, 'Menu item not found', 404);
    }
    successResponse(res, item, 'Menu item updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return errorResponse(res, 'Menu item not found', 404);
    }
    await item.deleteOne();
    successResponse(res, null, 'Menu item deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };
