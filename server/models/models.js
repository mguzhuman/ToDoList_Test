const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    text: DataTypes.TEXT,
    ischanged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isready: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = {
    Todo
}