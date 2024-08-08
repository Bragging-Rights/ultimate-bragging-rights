const express = require("express");
const router = express.Router();
const seasonDetailsController = require("../controllers/seasonDetails");

// Route to create a new season detail
router.post("/", seasonDetailsController.createSeasonDetail);

// Route to get all season details
router.get("/", seasonDetailsController.getAllSeasonDetails);

// Route to get a season detail by ID
router.get("/:id", seasonDetailsController.getSeasonDetailById);

// Route to update a season detail by ID
router.put("/:id", seasonDetailsController.updateSeasonDetailById);

// Route to delete a season detail by ID
router.delete("/:id", seasonDetailsController.deleteSeasonDetailById);

module.exports = router;
