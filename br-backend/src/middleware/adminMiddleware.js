const { errorResponse } = require('../utils/responseHandler');

const admin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || ['admin', 'manager', 'super-admin'].includes(req.user.role))) {
    next();
  } else {
    return errorResponse(res, 'Not authorized, admin access required', 403);
  }
};

module.exports = { admin };
