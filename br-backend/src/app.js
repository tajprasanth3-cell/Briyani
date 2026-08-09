const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middleware/rateLimiter');
const { securityHeaders, sanitizeInput, csrfProtection } = require('./middleware/securityMiddleware');
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(securityHeaders);
app.use(csrfProtection);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);
app.use('/api', apiLimiter);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/branches', require('./routes/branchRoutes'));
app.use('/api/bulk', require('./routes/bulkImportRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

module.exports = app;
