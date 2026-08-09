const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

const initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'taj-biryani-secret');
      socket.userId = decoded.id || decoded._id;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id, 'userId:', socket.userId);

    socket.on('join-order', (orderId) => {
      socket.join(`order-${orderId}`);
      console.log(`Socket ${socket.id} joined order-${orderId}`);
    });

    socket.on('join-admin', () => {
      socket.join('admin-room');
      console.log(`Socket ${socket.id} joined admin-room`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

const emitOrderUpdate = (orderId, orderData) => {
  if (io) {
    io.to(`order-${orderId}`).emit('order-status-update', {
      orderId,
      status: orderData.status,
      updatedAt: orderData.updatedAt,
      message: `Order status updated to ${orderData.status}`,
    });
    io.to('admin-room').emit('order-update', {
      orderId,
      status: orderData.status,
      totalAmount: orderData.totalAmount,
      updatedAt: orderData.updatedAt,
    });
  }
};

const emitNewOrder = (orderData) => {
  if (io) {
    io.to('admin-room').emit('new-order', {
      orderId: orderData._id,
      customer: orderData.user?.name || 'Customer',
      totalAmount: orderData.totalAmount,
      status: orderData.status,
      createdAt: orderData.createdAt,
    });
  }
};

const getIO = () => io;

module.exports = { initWebSocket, emitOrderUpdate, emitNewOrder, getIO };
