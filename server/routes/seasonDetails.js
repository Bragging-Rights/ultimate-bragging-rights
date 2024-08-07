const express = require("express");
const router = express.Router();
const seasonDetailsController = require("../controllers/seasonDetails");

// Route to create a new season detail
router.post("/season-details", seasonDetailsController.createSeasonDetail);

// Route to get all season details
router.get("/season-details", seasonDetailsController.getAllSeasonDetails);

// Route to get a season detail by ID
router.get("/season-details/:id", seasonDetailsController.getSeasonDetailById);

// Route to update a season detail by ID
router.put(
  "/season-details/:id",
  seasonDetailsController.updateSeasonDetailById
);

// Route to delete a season detail by ID
router.delete(
  "/season-details/:id",
  seasonDetailsController.deleteSeasonDetailById
);

module.exports = router;
