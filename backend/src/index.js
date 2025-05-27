require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend active");
});

try {
  const ordersRoutes = require('./routes/orders');
  app.use('/orders', ordersRoutes);

} catch (err) {
  console.error("Error loading orders routes:", err);
}

try {
  const userRoutes = require('./routes/users');
  app.use('/users', userRoutes);
} catch (err) {
  console.error("Error loading users routes:", err.message);
}

try{
  const availabilityRoutes = require('./routes/availability');
  app.use('/availability', availabilityRoutes);  
} catch (err){
  console.error("Error loading availability route:", err.message)
}

try{
  const usersRoutes = require('./routes/users');
  app.use('/api/users', usersRoutes);
} catch(err){
  console.error("Error loading /api/users route:", err.message)
}

try {
  const itemsRoutes = require('./routes/items');
  app.use('/items', itemsRoutes);
} catch (err) {
  console.error("Error loading items route:", err.message);
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;