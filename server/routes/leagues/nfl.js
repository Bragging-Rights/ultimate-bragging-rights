import express from "express";
import { createTeam, getTeams, getTeam, updateTeam, deleteTeam } from "./nfl";

const router = express.Router();

// Create
router.post("/teams", createTeam);

// Read
router.get("/teams", getTeams);
router.get("/teams/:id", getTeam);

// Update
router.put("/teams/:id", updateTeam);

// Delete
router.delete("/teams/:id", deleteTeam);

export default router;
