const express = require("express");
const router = express.Router();

const pokemonesController = require("../controllers/PokemonesController");

router.get("/", pokemonesController.Home);
router.post("/", pokemonesController.Filter);
router.get("/pokemon", pokemonesController.GetPokemones);
router.get("/create-pokemon", pokemonesController.AddPokemon);
router.post("/create-pokemon", pokemonesController.PostPokemon);
router.get("/edit-pokemon/:pokemonId", pokemonesController.EditPokemon);
router.get("/delete-pokemon/:pokemonId", pokemonesController.EditPokemon);
router.post("/edit-pokemon", pokemonesController.PostEditPokemon);
router.post("/delete-pokemon", pokemonesController.DeletePokemon);

module.exports = router;