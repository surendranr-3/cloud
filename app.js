require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Logger setup ----------
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// ---------- Security ----------
app.use(helmet());

// ---------- Rate limiting ----------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// ---------- Body parsing ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------- Routes ----------
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  res.json({ message: 'Hello from Cloud 🚀' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// ---------- Global error handler ----------
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// ---------- Server startup ----------
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// ---------- Graceful shutdown ----------
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});