const MenuItem = require('../models/MenuItem');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const bulkImportMenuItems = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return errorResponse(res, 'Please provide an array of menu items', 400);
    }

    const validCategories = [
      'Chicken Biryani', 'Mutton Biryani', 'Fish Biryani', 'Prawn Biryani',
      'Egg Biryani', 'Starters', 'Beverages', 'Desserts', 'Roti & Breads',
    ];

    const results = { created: 0, errors: [], skipped: 0 };

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      try {
        if (!item.name || !item.description || !item.price || !item.category) {
          results.errors.push({ index: i, name: item.name || 'Unknown', error: 'Missing required fields' });
          results.skipped++;
          continue;
        }

        if (!validCategories.includes(item.category)) {
          results.errors.push({ index: i, name: item.name, error: `Invalid category: ${item.category}` });
          results.skipped++;
          continue;
        }

        const existing = await MenuItem.findOne({ name: item.name.trim() });
        if (existing) {
          results.errors.push({ index: i, name: item.name, error: 'Item already exists' });
          results.skipped++;
          continue;
        }

        await MenuItem.create({
          name: item.name.trim(),
          description: item.description.trim(),
          price: Number(item.price),
          category: item.category,
          image: item.image || '',
          isAvailable: item.isAvailable !== false,
          isVegetarian: item.isVegetarian || false,
          spiceLevel: item.spiceLevel || 'Medium',
        });
        results.created++;
      } catch (err) {
        results.errors.push({ index: i, name: item.name || 'Unknown', error: err.message });
        results.skipped++;
      }
    }

    successResponse(res, results, `Bulk import completed: ${results.created} created, ${results.skipped} skipped`);
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { bulkImportMenuItems };
