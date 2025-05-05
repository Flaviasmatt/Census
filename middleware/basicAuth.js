const { Admin } = require('../models');

async function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Autenticado com sucesso
    next();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = basicAuth;
