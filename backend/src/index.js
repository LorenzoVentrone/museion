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

try{
  const availabilityRoutes = require('./routes/availability');
  app.use('/availability', availabilityRoutes);  
} catch (err){
  console.error("Errore nel caricamento della rotta:",err.message)
}

try{
  const usersRoutes = require('./routes/users');
  app.use('/api/users', usersRoutes);
} catch(err){
  console.error("Errore nel caricamento della rotta:",err.message)
}


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
  });
}

module.exports = app;