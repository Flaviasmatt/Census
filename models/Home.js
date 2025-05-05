const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Participant = require('./Participant');

const Home = sequelize.define('Home', {
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relacionamento: um participante tem uma residência
Home.belongsTo(Participant, {
  foreignKey: 'participantEmail',
  onDelete: 'CASCADE'
});
Participant.hasOne(Home, {
  foreignKey: 'participantEmail'
});

module.exports = Home;
