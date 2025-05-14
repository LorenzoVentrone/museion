require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend attivo");
});

try {
  const ordersRoutes = require('./routes/orders');
  app.use('/orders', ordersRoutes);

} catch (err) {
  console.error("Errore nel caricamento delle rotte:", err);
}

try {
  const userRoutes = require('./routes/users');
  app.use('/users', userRoutes);
} catch (err) {
  console.error("Errore nel caricamento delle rotte:", err.message);
}


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
  });
}

module.exports = app;