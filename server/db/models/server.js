'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Server extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User,{foreignKey:'userId'})
    }
  }
  Server.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    address:{
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    chronicles: {
      type: DataTypes.STRING
    },
    openAt: {
      type: DataTypes.DATE
    },
    destroyAt: {
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Server',
  });
  return Server;
};