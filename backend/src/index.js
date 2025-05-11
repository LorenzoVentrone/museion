require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend attivo");
});

// Importa ed usa le rotte per gli ordini
const ordersRoutes = require('./routes/orders');
app.use('/orders', ordersRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
  });
}

module.exports = app;