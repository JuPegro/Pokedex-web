
const Pokemon = require("../models/Pokemons");
const Region = require("../models/Regions");
const Type = require("../models/Types");

exports.Home = (req,res,next) => {

    Pokemon.findAll({include:[{model: Region},{model: Type}]})
    .then(result =>{

        const Pokemon = result.map((result) => result.dataValues);

        let regionValue;

        Region.findAll()
        .then(result =>{
            regionValue = result.map((result) => result.dataValues);

            res.render("pokemones/home",{
                pageTitle: "Pokemones", 
                HomeActive: true,
                pokemons: Pokemon,
                regions: regionValue,
                hasPokemon: Pokemon.length > 0
            });
        }).catch(err =>{
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
};

exports.Filter = (req,res,next) => {

    const RegionId = req.body.MovieGender;
    const name = req.body.pokemonname;

    console.log(name);

    if(RegionId == "All" && name == "")
    {
        return res.redirect("/");

    }else if (RegionId != "All" && RegionId != undefined && name == ""){
        Pokemon.findAll({include:[{model: Region},{model: Type}], where: {RegionId: RegionId}})
    .then(result =>{

        const Pokemon = result.map((result) => result.dataValues);

        let regionValue;

        Region.findAll()
        .then(result =>{
            regionValue = result.map((result) => result.dataValues);

            res.render("pokemones/home",{
                pageTitle: "Pokemones", 
                HomeActive: true,
                pokemons: Pokemon,
                regions: regionValue,
                hasPokemon: Pokemon.length > 0
            });
        }).catch(err =>{
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
    } else if(RegionId == "All" && name != "")
    {
        Pokemon.findAll({include:[{model: Region},{model: Type}], where: {name: name}})
    .then(result =>{

        const Pokemon = result.map((result) => result.dataValues);

        let regionValue;

        Region.findAll()
        .then(result =>{
            regionValue = result.map((result) => result.dataValues);

            res.render("pokemones/home",{
                pageTitle: "Pokemones", 
                HomeActive: true,
                pokemons: Pokemon,
                regions: regionValue,
                hasPokemon: Pokemon.length > 0
            });
        }).catch(err =>{
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
    } else if(RegionId != "All" && name != ""){
        Pokemon.findAll({include:[{model: Region},{model: Type}], where: {name: name, RegionId: RegionId}})
    .then(result =>{

        const Pokemon = result.map((result) => result.dataValues);

        let regionValue;

        Region.findAll()
        .then(result =>{
            regionValue = result.map((result) => result.dataValues);

            res.render("pokemones/home",{
                pageTitle: "Pokemones", 
                HomeActive: true,
                pokemons: Pokemon,
                regions: regionValue,
                hasPokemon: Pokemon.length > 0
            });
        }).catch(err =>{
            console.log(err);
        });

    }).catch(err => {
        console.log(err);
    });
    } 
};

exports.GetPokemones = (req,res,next) => {

    Pokemon.findAll({include:[{model: Region},{model: Type}]})
    .then(result =>{

        const Pokemon = result.map((result) => result.dataValues);

        res.render("pokemones/pokemons",{
            pageTitle: "Pokemones", 
            pokemonActive: true,
            pokemons: Pokemon,
            hasPokemon: Pokemon.length > 0
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.AddPokemon = (req,res,next) => {

    let regionValue;

    Region.findAll()
    .then(result =>{
        regionValue = result.map((result) => result.dataValues);
    }).catch(err =>{
        console.log(err);
    });

    Type.findAll()
    .then(result =>{
        const type = result.map((result) => result.dataValues);
        res.render("pokemones/save-pokemons",{
            pageTitle: "Create Pokemon", 
            pokemonActive: true,
            editMode: false,
            types: type,
            regions: regionValue,
            hasTypes: type.length > 0,
            hasRegions: regionValue.length > 0,
        });
    }).catch(err =>{
        console.log(err);
    });
};

exports.PostPokemon = (req,res,next) => {

    const name = req.body.name;
    const picture = req.body.picture;
    const IdPrimario = req.body.IdPrimario;
    const IdRegion = req.body.IdRegion;

    Pokemon.create({name: name, picture: picture,RegionId: IdRegion, TypeId: IdPrimario})
    .then(result =>{
        return res.redirect("/pokemon");
    }).catch(err =>{
        console.log(err);
    });
};

exports.EditPokemon = (req,res,next) => {

    const edit = req.query.edit;
    const pokemonId = req.params.pokemonId;

    if(!edit){
        return res.redirect("/pokemon");
    }

    Pokemon.findOne({where: {id: pokemonId}} )
    .then(result =>{
        const pokemon = result.dataValues;
        if(!pokemon){
            return res.redirect("/pokemon");
        }

        Region.findAll()
        .then(result =>{
            regionValue = result.map((result) => result.dataValues);
        }).catch(err =>{
            console.log(err);
        });

        Type.findAll()
        .then(result =>{
            const type = result.map((result) => result.dataValues);
            res.render("pokemones/save-pokemons",{
                pageTitle: "Edit Pokemon", 
                pokemonActive: true,
                editMode: edit,
                pokemon: pokemon,
                types: type,
                hasTypes: type.length > 0,
                regions: regionValue,
                hasRegions: regionValue.length > 0
            });
        }).catch(err =>{
            console.log(err);
        });


    }).catch(err => {
        console.log(err);
    });
};

exports.PostEditPokemon = (req,res,next) => {

    const name = req.body.name;
    const picture = req.body.picture;
    const pokemonId = req.body.pokemonId;
    const IdPrimario = req.body.IdPrimario;
    const IdRegion = req.body.IdRegion;

    Pokemon.update(
        {name: name, picture: picture,RegionId: IdRegion, TypeId: IdPrimario},
        {where: {id: pokemonId}}
    ).then(result => {
        return res.redirect("/pokemon");
    }).catch(err =>{
        console.log(err);
    })
};

exports.DeletePokemon = (req,res,next) => {

    const pokemonId = req.body.pokemonId;
    
    Pokemon.destroy({where: {id: pokemonId}})
    .then(result => {
        const pokemon = result.dataValues;
        return res.redirect("/pokemon");
    }).catch(err =>{
        console.log(err);
    })
};

exports.GetDeletePokemon = (req,res,next) => {

    const pokemonId = req.body.pokemonId;
    
    Pokemon.findOne({where: {id: pokemonId}})
    .then(result => {
        const pokemon = result.dataValues;
        return res.redirect("/delete-pokemon");
    }).catch(err =>{
        console.log(err);
    })
};