require('dotenv').config();
const { Admin } = require('../models');

async function createAdmin() {
  try {
    const existing = await Admin.findOne({ where: { username: 'admin' } });
    if (existing) {
      console.log('Admin already exists.');
      return;
    }

    await Admin.create({
      username: 'admin',
      password: 'P4ssword' // armazenado em texto simples por exigência do exercício
    });

    console.log('Admin created successfully.');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin();
