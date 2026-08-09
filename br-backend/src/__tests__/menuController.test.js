const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

let mongoServer;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@test.com',
    password: hashedPassword,
    isAdmin: true,
    role: 'admin',
  });
  adminToken = generateToken(admin._id);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Menu Controller', () => {
  const testItem = {
    name: 'Chicken Dum Biryani',
    description: 'Aromatic biryani with tender chicken',
    price: 599,
    category: 'Chicken Biryani',
    spiceLevel: 'Medium',
  };

  describe('POST /api/menu', () => {
    it('should create menu item as admin', async () => {
      const res = await request(app)
        .post('/api/menu')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(testItem);
      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('Chicken Dum Biryani');
    });

    it('should reject without auth', async () => {
      const res = await request(app)
        .post('/api/menu')
        .send(testItem);
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/menu', () => {
    it('should get all menu items', async () => {
      const res = await request(app).get('/api/menu');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.items)).toBe(true);
    });

    it('should filter by category', async () => {
      const res = await request(app).get('/api/menu?category=Chicken Biryani');
      expect(res.status).toBe(200);
    });

    it('should search by name', async () => {
      const res = await request(app).get('/api/menu?search=chicken');
      expect(res.status).toBe(200);
    });
  });

  describe('PUT /api/menu/:id', () => {
    it('should update menu item', async () => {
      const created = await request(app)
        .post('/api/menu')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...testItem, name: 'Mutton Biryani', category: 'Mutton Biryani', price: 799 });

      const res = await request(app)
        .put(`/api/menu/${created.body.data._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 849 });
      expect(res.status).toBe(200);
      expect(res.body.data.price).toBe(849);
    });
  });

  describe('DELETE /api/menu/:id', () => {
    it('should delete menu item', async () => {
      const created = await request(app)
        .post('/api/menu')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...testItem, name: 'To Delete Item' });

      const res = await request(app)
        .delete(`/api/menu/${created.body.data._id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });
});
