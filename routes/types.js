const express = require("express");
const router = express.Router();

const typesController = require("../controllers/TypesController");

router.get("/types", typesController.GetTypes);
router.get("/create-types", typesController.AddTypes);
router.post("/create-types", typesController.PostTypes);
router.get("/edit-types/:typesId", typesController.EditTypes);
router.post("/edit-types", typesController.PostEditTypes);
router.post("/delete-types", typesController.DeleteTypes);

module.exports = router;