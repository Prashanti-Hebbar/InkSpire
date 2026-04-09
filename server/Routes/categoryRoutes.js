import express from "express";
import * as controller from "../controllers/categoryController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, controller.create);
router.get("/", controller.getAll);
router.put("/:id", verifyToken, isAdmin, controller.update);
router.delete("/:id", verifyToken, isAdmin, controller.remove);

export default router;