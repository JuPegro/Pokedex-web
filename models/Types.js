
//import { Sequelize } from "sequelize";

const  Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Types = sequelize.define("Types",{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
});

module.exports = Types;