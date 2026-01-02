import express from "express";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} from "../controllers/expense.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("ADMIN", "MANAGER", "EMPLOYEE"), addExpense);
router.get("/", protect, getExpenses);
router.put("/:id", protect, authorize("ADMIN"), updateExpense);
router.delete("/:id", protect, authorize("ADMIN"), deleteExpense);

export default router;
