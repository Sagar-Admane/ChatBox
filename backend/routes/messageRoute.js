import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allMessage, sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:chatId", protect, allMessage);

export default router;