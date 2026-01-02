import ExpenseModel from "../model/expense.model.js";

/* ================= ADD EXPENSE ================= */

export const addExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.create({
      ...req.body,
      createdBy: req.user.userId,
      companyId: req.user.companyId,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};

/* ================= GET EXPENSES ================= */

export const getExpenses = async (req, res) => {
  try {
    let filter = { companyId: req.user.companyId };

    // Employee can see only own expenses
    if (req.user.role === "EMPLOYEE") {
      filter.createdBy = req.user.userId;
    }

    const expenses = await ExpenseModel.find(filter)
      .populate("createdBy", "name");

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

/* ================= UPDATE EXPENSE ================= */

export const updateExpense = async (req, res) => {
  try {
    let filter = {
      _id: req.params.id,
      companyId: req.user.companyId,
    };

    // Employee can update only own expense
    if (req.user.role === "EMPLOYEE") {
      filter.createdBy = req.user.userId;
    }

    const expense = await ExpenseModel.findOneAndUpdate(
      filter,
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};

/* ================= DELETE EXPENSE ================= */

export const deleteExpense = async (req, res) => {
  try {
    let filter = {
      _id: req.params.id,
      companyId: req.user.companyId,
    };

    // Employee can delete only own expense
    if (req.user.role === "EMPLOYEE") {
      filter.createdBy = req.user.userId;
    }

    const expense = await ExpenseModel.findOneAndDelete(filter);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};
