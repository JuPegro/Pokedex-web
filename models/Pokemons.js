
//import { Sequelize } from "sequelize";

const  Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Regions = sequelize.define("Pokemon",{
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
    picture: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Regions;