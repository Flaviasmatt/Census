require('dotenv').config();
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

app.use(express.json());

// Rota principal
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
