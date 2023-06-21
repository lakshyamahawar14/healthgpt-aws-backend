import express from "express";
import {
  getAdaSummary,
  getDavinciSummary,
  getDavinciUserBelief,
  getDavinciUserSymptom,
  getTurboResponse,
} from "../controllers/gptController.mjs";

const router = express.Router();

router.get("/summary/ada", getAdaSummary);
router.get("/summary/davinci", getDavinciSummary);
router.get("/response/turbo", getTurboResponse);
router.get("/belief/davinci", getDavinciUserBelief);
router.get("/symptom/davinci", getDavinciUserSymptom);

export { router };
