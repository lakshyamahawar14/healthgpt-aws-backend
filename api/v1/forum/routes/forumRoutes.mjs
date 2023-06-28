import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  updatePost,
  updateComments,
} from "../controllers/forumController.mjs";

router.get("/posts", getPosts);
router.get("/post", getPost);
router.post("/post", updatePost);
router.post("/post/comments", updateComments);

export { router };
