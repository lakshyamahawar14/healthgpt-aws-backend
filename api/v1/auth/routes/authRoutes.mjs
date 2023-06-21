import express from "express";
import {
  loginUser,
  resetPassword,
  signoutUser,
  signupUser,
  verifyToken,
} from "../controllers/authController.mjs";

const router = express.Router();

router.get("/login", loginUser);
router.post("/signup", signupUser);
router.get("/signout", signoutUser);
router.get("/reset", resetPassword);
router.get("/login/verify", verifyToken);

export { router };
