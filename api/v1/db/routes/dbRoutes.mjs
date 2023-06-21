import express from "express";
import {
  getChat,
  updateChat,
  getSymptom,
  updateSymptom,
  getUserData,
  getSummary,
  updateSummary,
  getBelief,
  updateBelief,
  getScore,
  updateScore,
} from "../controllers/dbController.mjs";

const router = express.Router();

router.get("/chat", getChat);
router.post("/chat", updateChat);
router.get("/symptom", getSymptom);
router.post("/symptom", updateSymptom);
router.get("/summary", getSummary);
router.post("/summary", updateSummary);
router.get("/user", getUserData);
router.get("/belief", getBelief);
router.post("/belief", updateBelief);
router.get("/score", getScore);
router.post("/score", updateScore);

export { router };
