import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  updateComments,
} from "../controllers/forumController.mjs";

router.get("/posts", getPosts);
router.get("/post", getPost);
router.post("/post/comments", updateComments);

export { router };
