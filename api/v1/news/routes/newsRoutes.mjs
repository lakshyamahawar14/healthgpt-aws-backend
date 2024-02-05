import express from "express";
const router = express.Router();
import { getNews } from "../controllers/newsController.mjs";

router.get("/news", getNews);

export { router };
