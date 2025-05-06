const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuth');
const { Participant, Work, Home } = require('../models');

// POST /participants/add
router.post('/add', basicAuth, async (req, res) => {
  const { email, firstname, lastname, dob, work, home } = req.body;

  // Verificação de dados obrigatórios
  if (!email || !firstname || !lastname || !dob || !work || !home) {
    return res.status(400).json({ error: 'Missing required participant, work, or home data.' });
  }

  // Validação simples de formato
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  if (!dateRegex.test(dob)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }

  try {
    // Verifica se já existe
    const existing = await Participant.findByPk(email);
    if (existing) {
      return res.status(409).json({ error: 'Participant already exists.' });
    }

    // Cria o participante
    const participant = await Participant.create({ email, firstname, lastname, dob });

    // Cria os dados de trabalho e residência relacionados
    await Work.create({
      companyname: work.companyname,
      salary: work.salary,
      currency: work.currency,
      participantEmail: email
    });

    await Home.create({
      country: home.country,
      city: home.city,
      participantEmail: email
    });

    return res.status(201).json({ message: 'Participant created successfully.' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /participants
router.get('/', basicAuth, async (req, res) => {
  try {
    const participants = await Participant.findAll({
      include: [Work, Home]
    });

    res.status(200).json({ data: participants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /participants/details
router.get('/details', basicAuth, async (req, res) => {
  try {
    const participants = await Participant.findAll({
      attributes: ['email', 'firstname', 'lastname']
    });

    res.status(200).json({ data: participants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /participants/details/:email
router.get('/details/:email', basicAuth, async (req, res) => {
  const { email } = req.params;

  try {
    const participant = await Participant.findByPk(email, {
      attributes: ['firstname', 'lastname', 'dob']
    });

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found.' });
    }

    res.status(200).json({ data: participant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /participants/work/:email
router.get('/work/:email', basicAuth, async (req, res) => {
  const { email } = req.params;

  try {
    const work = await Work.findOne({
      where: { participantEmail: email },
      attributes: ['companyname', 'salary', 'currency']
    });

    if (!work) {
      return res.status(404).json({ error: 'Work details not found for this participant.' });
    }

    res.status(200).json({ data: work });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /participants/home/:email
router.get('/home/:email', basicAuth, async (req, res) => {
  const { email } = req.params;

  try {
    const home = await Home.findOne({
      where: { participantEmail: email },
      attributes: ['country', 'city']
    });

    if (!home) {
      return res.status(404).json({ error: 'Home details not found for this participant.' });
    }

    res.status(200).json({ data: home });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT /participants/:email
router.put('/:email', basicAuth, async (req, res) => {
  const { email } = req.params;
  const { firstname, lastname, dob, work, home } = req.body;

  if (!firstname || !lastname || !dob || !work || !home) {
    return res.status(400).json({ error: 'Missing required fields in request body.' });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dob)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
  }

  try {
    const participant = await Participant.findByPk(email);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found.' });
    }

    // Atualiza dados pessoais
    await participant.update({ firstname, lastname, dob });

    // Atualiza dados de trabalho
    const workData = await Work.findOne({ where: { participantEmail: email } });
    if (workData) {
      await workData.update({
        companyname: work.companyname,
        salary: work.salary,
        currency: work.currency
      });
    }

    // Atualiza dados de residência
    const homeData = await Home.findOne({ where: { participantEmail: email } });
    if (homeData) {
      await homeData.update({
        country: home.country,
        city: home.city
      });
    }

    return res.status(200).json({ message: 'Participant updated successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// DELETE /participants/:email
router.delete('/:email', basicAuth, async (req, res) => {
  const { email } = req.params;

  try {
    const participant = await Participant.findByPk(email);

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found.' });
    }

    await participant.destroy(); // isso também apaga Work e Home via cascade

    return res.status(200).json({ message: 'Participant deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



module.exports = router;
