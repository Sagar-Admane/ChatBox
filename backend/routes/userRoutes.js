import express from "express";
import { allUser, authUser, registerUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser)
router.post("/login",authUser)
router.get("/", protect, allUser);

export default router;