const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth');

router.get('/', (req, res) => {
  res.json({ message: 'API do Censo está funcionando!' });
});

// Rota protegida
router.get('/protected', basicAuth, (req, res) => {
  res.json({ message: 'Acesso autorizado. Bem-vindo, Admin!' });
});

module.exports = router;


