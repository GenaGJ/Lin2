'use strict';
const { Server } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Server.bulkCreate([
      {
        address:'valhalla-age.org/ru',
        name: 'VALHALLA-AGE.RU',
        desc:'TOP',
        rating:'3',
        chronicles:'Interlude',
        openAt: '2024-04-29 00:00:00.053+03',
        
        destroyAt:'2024-04-30 00:00:00.053+03',
        userId:2,
      },
      {
        address:'elmorelab.com',
        name: 'ELMORELAB.COM',
        desc:'TOP',
        rating: '7',
        chronicles:'High Five',
        openAt: '2024-05-29 00:00:00.053+03',
       
        destroyAt:'2024-05-30 00:00:00.053+03',
        userId:2,
    
      },
  

    ]);
  },

  async down (queryInterface, Sequelize) {
    await Server.destroy();
  }
};
