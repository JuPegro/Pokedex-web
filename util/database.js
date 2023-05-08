
//import { Sequelize } from "sequelize";

const  Sequelize = require("sequelize");

const sequelize = new Sequelize("pokedex","root","admin",{
    dialect: "mysql",
    host:"localhost", 
    port:"3306"
});

module.exports = sequelize;