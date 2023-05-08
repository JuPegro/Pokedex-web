const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const sequelize = require("./util/database");
const Regions = require("./models/Regions");
const Types = require("./models/Types");
const Pokemon = require("./models/Pokemons");

const errorController = require("./controllers/ErrorController");

const pokemonesRouter = require("./routes/pokemones");
const regionsRouter = require("./routes/regions");
const typesRouter = require("./routes/types");

const compareHelper = require("./util/helpers/hbs/compare");
const values = require("./util/helpers/hbs/values");

const app = express();

app.engine("hbs", expressHbs({
    layoutsDir:"views/layouts/",
    defaultLayout: "main-layout", 
    extname:"hbs",
    helpers: {
        SameValue: compareHelper.EqualValue,
        Confirm: values.Values,
    }
})
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,"public")));

app.use(pokemonesRouter);
app.use(regionsRouter);
app.use(typesRouter);

app.use(errorController.Get404);

Pokemon.belongsTo(Regions,{constraint: true, onDelete:"CASCADE"});
Regions.hasMany(Pokemon);

Pokemon.belongsTo(Types,{constraint: true, onDelete:"CASCADE"})
Types.hasMany(Pokemon);

sequelize.sync().then(result => {
    app.listen(5003);
    console.log('Server listen Port 5003')
}).catch(err =>{
    console.log(err);
});