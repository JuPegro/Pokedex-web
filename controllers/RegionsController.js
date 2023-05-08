
const Region = require("../models/Regions");

exports.GetRegions = (req,res,next) => {

    Region.findAll()
    .then(result =>{

        const regions = result.map((result) => result.dataValues);

        res.render("regions/regions",{
            pageTitle: "Regions", 
            RegionActive: true,
            regions: regions,
            hasRegion: regions.length > 0
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.AddRegions = (req,res,next) => {
    res.render("regions/save-regions",{
        pageTitle: "Create Regions", 
        RegionActive: true,
        editMode: false
    });
};

exports.PostRegions = (req,res,next) => {

    const name = req.body.name;

    Region.create({name: name})
    .then(result =>{
        return res.redirect("/regions");
    }).catch(err =>{
        console.log(err);
    });
};

exports.EditRegions = (req,res,next) => {

    const edit = req.query.edit;
    const regionId = req.params.regionId;

    if(!edit){
        return res.redirect("/regions");
    }

    Region.findOne({where: {id: regionId}})
    .then(result =>{
        const region = result.dataValues;

        if(!result){
            return res.redirect("/regions");
        }else{
            res.render("regions/save-regions",{
                pageTitle: "Edit Regions", 
                RegionActive: true,
                editMode: edit,
                regions: region,
            });
        }
    }).catch(err => {
        console.log(err);
    });
};

exports.PostEditRegions = (req,res,next) => {

    const name = req.body.name;
    const regionId = req.body.regionId;

    Region.update(
        {name: name},
        {where: {id: regionId}}
    ).then(result => {
        return res.redirect("/regions");
    }).catch(err =>{
        console.log(err);
    })
};

exports.DeleteRegions = (req,res,next) => {

    const regionId = req.body.regionId;

    Region.destroy({where: {id: regionId}})
    .then(result => {
        return res.redirect("/regions");
    }).catch(err =>{
        console.log(err);
    })
};
