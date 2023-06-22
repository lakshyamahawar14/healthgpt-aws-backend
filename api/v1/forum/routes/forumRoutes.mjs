import express from "express";
const router = express.Router();
import { getPosts } from "../controllers/forumController.mjs";

router.get("/posts", getPosts);

export { router };
