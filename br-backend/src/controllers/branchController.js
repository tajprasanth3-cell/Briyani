const Branch = require('../models/Branch');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find({ isActive: true }).sort('name');
    successResponse(res, branches);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find().sort('-createdAt');
    successResponse(res, branches);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const createBranch = async (req, res) => {
  try {
    const { name, address, city, phone, email, openingHours, coordinates } = req.body;
    const branch = await Branch.create({
      name, address, city, phone, email, openingHours, coordinates,
    });
    successResponse(res, branch, 'Branch created successfully', 201);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const updateBranch = async (req, res) => {
  try {
    const updates = {};
    const fields = ['name', 'address', 'city', 'phone', 'email', 'isActive', 'openingHours', 'coordinates'];
    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    const branch = await Branch.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!branch) {
      return errorResponse(res, 'Branch not found', 404);
    }
    successResponse(res, branch, 'Branch updated successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deleteBranch = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return errorResponse(res, 'Branch not found', 404);
    }
    await branch.deleteOne();
    successResponse(res, null, 'Branch deleted successfully');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getBranches, getAllBranches, createBranch, updateBranch, deleteBranch };
