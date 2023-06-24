import express from "express";
const router = express.Router();
import {
  getTests,
  getDepressionTest,
  getAnxietyTest,
  getPtsdTest,
  getBipolarTest,
  getInsomniaTest,
  evaluateScore,
  getGeneralTest,
  evaluateGeneralTest,
  getTask,
  updateTask,
} from "../controllers/assessmentController.mjs";

router.get("/", getTests);
router.get("/general", getGeneralTest);
router.get("/depression", getDepressionTest);
router.get("/anxiety", getAnxietyTest);
router.get("/ptsd", getPtsdTest);
router.get("/bipolar", getBipolarTest);
router.get("/insomnia", getInsomniaTest);
router.get("/evaluate", evaluateScore);
router.get("/general/evaluate", evaluateGeneralTest);
router.get("/tasks", getTask);
router.post("/tasks", updateTask);

export { router };
