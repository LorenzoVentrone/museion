require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Backend active");
});

// Load and use orders routes
try {
  const ordersRoutes = require('./routes/orders');
  app.use('/orders', ordersRoutes);
} catch (err) {
  console.error("Error loading orders routes:", err);
}

// Load and use users routes
try {
  const userRoutes = require('./routes/users');
  app.use('/users', userRoutes);
} catch (err) {
  console.error("Error loading users routes:", err.message);
}

// Load and use availability routes
try {
  const availabilityRoutes = require('./routes/availability');
  app.use('/availability', availabilityRoutes);  
} catch (err) {
  console.error("Error loading availability route:", err.message)
}

// Load and use items routes
try {
  const itemsRoutes = require('./routes/items');
  app.use('/items', itemsRoutes);
} catch (err) {
  console.error("Error loading items route:", err.message);
}

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;