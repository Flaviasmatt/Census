const sequelize = require('../config/database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

// Register models
const Participant = require('./Participant');
const Work = require('./Work');
const Home = require('./Home');
const Admin = require('./Admin');

sequelize.sync();

module.exports = { sequelize, Participant, Work, Home, Admin };


