require('dotenv').config();
require('./models'); // Faz a conexão com o banco ao iniciar
const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const participantsRouter = require('./routes/participants');

app.use(express.json());

// Rotas
app.use('/participants', participantsRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
