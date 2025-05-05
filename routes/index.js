const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API do Censo está funcionando!' });
});

module.exports = router;
