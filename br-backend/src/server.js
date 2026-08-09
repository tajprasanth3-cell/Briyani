const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { initWebSocket } = require('./websocket');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  const server = http.createServer(app);
  initWebSocket(server);
  server.listen(PORT, () => {
    console.log(`Taj Briyani server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});
