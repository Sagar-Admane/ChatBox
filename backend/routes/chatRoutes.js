import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat, addToGroup, createGroupChatFunction, fetchChats, removeFromGroup, renameGroup } from "../controller/chatController.js";

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group",protect, createGroupChatFunction);
router.put("/rename",protect, renameGroup);
router.put("/groupremove", protect, removeFromGroup);
router.put("/groupadd", protect, addToGroup);

export default router;