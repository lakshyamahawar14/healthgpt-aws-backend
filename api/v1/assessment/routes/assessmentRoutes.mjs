import express from "express";
const router = express.Router();
import {
  getTests,
  getTest,
  evaluateScore,
  evaluateGeneralScore,
  getTask,
  updateTask,
} from "../controllers/assessmentController.mjs";

router.get("/", getTests);
router.get("/test", getTest);
router.get("/test/evaluate", evaluateScore);
router.get("/general/evaluate", evaluateGeneralScore);
router.get("/tasks", getTask);
router.post("/tasks", updateTask);

export { router };
