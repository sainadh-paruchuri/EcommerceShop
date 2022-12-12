const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Cart=sequelize.define('cart',{
    id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
   productName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity:{
     type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
})

module.exports=Cart;