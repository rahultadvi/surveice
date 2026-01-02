import ExpenseModel from "../model/expense.model.js";

export const addExpense = async (req, res) => {
  const expense = await  ExpenseModel.create({
    ...req.body,
    createdBy: req.user.userId,
    companyId: req.user.companyId
  });
  res.status(201).json(expense);
};

export const getExpenses = async (req, res) => {
  let filter = { companyId: req.user.companyId };

  if (req.user.role === "EMPLOYEE") {
    filter.createdBy = req.user.userId;
  }

  const expenses = await ExpenseModel.find(filter).populate("createdBy", "name");
  res.json(expenses);
};

export const updateExpense = async (req, res) => {
  const expense = await ExpenseModel.findOneAndUpdate(
    { _id: req.params.id, companyId: req.user.companyId },
    req.body,
    { new: true }
  );
  res.json(expense);
};

export const deleteExpense = async (req, res) => {
  await Expense.findOneAndDelete({
    _id: req.params.id,
    companyId: req.user.companyId
  });
  res.json({ message: "Expense deleted" });
};
