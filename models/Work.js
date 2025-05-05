const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Participant = require('./Participant');

const Work = sequelize.define('Work', {
  companyname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Relacionamento: um participante tem um trabalho
Work.belongsTo(Participant, {
  foreignKey: 'participantEmail',
  onDelete: 'CASCADE'
});
Participant.hasOne(Work, {
  foreignKey: 'participantEmail'
});

module.exports = Work;


