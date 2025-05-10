require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend attivo");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
