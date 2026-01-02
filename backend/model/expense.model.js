import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

const ExpenseModel = mongoose.model("Expense", expenseSchema);

export default ExpenseModel;
