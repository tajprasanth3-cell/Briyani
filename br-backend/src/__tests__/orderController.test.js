const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

let mongoServer;
let userToken, adminToken;
let testMenuItem;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const user = await User.create({ name: 'Test', email: 'user@test.com', password: hashedPassword });
  userToken = generateToken(user._id);

  const admin = await User.create({ name: 'Admin', email: 'admin@test.com', password: hashedPassword, isAdmin: true, role: 'admin' });
  adminToken = generateToken(admin._id);

  testMenuItem = await MenuItem.create({
    name: 'Test Biryani',
    description: 'Test item',
    price: 599,
    category: 'Chicken Biryani',
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Order Controller', () => {
  describe('POST /api/orders', () => {
    it('should create an order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          items: [{ menuItem: testMenuItem._id, quantity: 2 }],
          orderType: 'delivery',
          deliveryAddress: '123 Test Street',
        });
      expect(res.status).toBe(201);
      expect(res.body.data.totalAmount).toBe(1198);
    });

    it('should reject empty order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ items: [], orderType: 'dine-in' });
      expect(res.status).toBe(400);
    });

    it('should reject without auth', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ items: [{ menuItem: testMenuItem._id, quantity: 1 }], orderType: 'dine-in' });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/orders', () => {
    it('should get user orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('PUT /api/orders/:id/cancel', () => {
    it('should cancel a pending order', async () => {
      const created = await request(app)
        .post('/api/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ items: [{ menuItem: testMenuItem._id, quantity: 1 }], orderType: 'takeaway' });

      const res = await request(app)
        .put(`/api/orders/${created.body.data._id}/cancel`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(200);
    });
  });
});
