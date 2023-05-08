const express = require("express");
const router = express.Router();

const regionsController = require("../controllers/RegionsController");

router.get("/regions", regionsController.GetRegions);
router.get("/create-regions", regionsController.AddRegions);
router.post("/create-regions", regionsController.PostRegions);
router.get("/edit-regions/:regionId", regionsController.EditRegions);
router.post("/edit-regions", regionsController.PostEditRegions);
router.post("/delete-regions", regionsController.DeleteRegions);

module.exports = router;