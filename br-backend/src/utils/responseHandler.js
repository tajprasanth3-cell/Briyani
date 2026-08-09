const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  if (res.headersSent) return res;
  return res.status(statusCode).json({ success: true, message, data });
};

const errorResponse = (res, message = 'Server Error', statusCode = 500) => {
  if (res.headersSent) return res;
  return res.status(statusCode).json({ success: false, message });
};

module.exports = { successResponse, errorResponse };
