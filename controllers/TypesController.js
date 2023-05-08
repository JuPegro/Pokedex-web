const Types = require("../models/Types");

exports.GetTypes = (req,res,next) => {

    Types.findAll()
    .then(result =>{

        const Types = result.map((result) => result.dataValues);

        res.render("types/types",{
            pageTitle: "Types", 
            TypesActive: true,
            types: Types,
            hasTypes: Types.length > 0
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.AddTypes = (req,res,next) => {
    res.render("types/save-types",{
        pageTitle: "Create Types", 
        TypesActive: true,
        editMode: false
    });
};

exports.PostTypes = (req,res,next) => {

    const name = req.body.name;

    Types.create({name: name})
    .then(result =>{
        return res.redirect("/types");
    }).catch(err =>{
        console.log(err);
    });
};

exports.EditTypes = (req,res,next) => {

    const edit = req.query.edit;
    const typesId = req.params.typesId;

    if(!edit){
        return res.redirect("/types");
    }

    Types.findOne({where: {id: typesId}})
    .then(result =>{
        const type = result.dataValues;

        if(!result){
            return res.redirect("/types");
        }else{
            res.render("types/save-types",{
                pageTitle: "Edit Types", 
                TypesActive: true,
                editMode: edit,
                types: type,
            });
        }
    }).catch(err => {
        console.log(err);
    });
};

exports.PostEditTypes = (req,res,next) => {

    const name = req.body.name;
    const typesId = req.body.TypesId;

    Types.update(
        {name: name},
        {where: {id: typesId}}
    ).then(result => {
        return res.redirect("/types");
    }).catch(err =>{
        console.log(err);
    })
};

exports.DeleteTypes = (req,res,next) => {

    const typesId = req.body.TypesId;

    Types.destroy({where: {id: typesId}})
    .then(result => {
        return res.redirect("/types");
    }).catch(err =>{
        console.log(err);
    })
};
