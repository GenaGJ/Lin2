'use strict';
const bcrypt = require('bcrypt');
const {User} = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        name: 'genagj',
        password:  await bcrypt.hash('VFCNTHbuhs1', 10),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await User.destroy();
  }
};
