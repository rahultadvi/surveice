import cron from "node-cron";
import { generateExpensePDF } from "../utils/pdfGenerator.js";
import { sendEmailWithPDF } from "../utils/emailService.js";
import ExpenseModel from "../model/expense.model.js";
import UserModel from "../model/user.model.js";
import CompanyModel from "../model/company.model.js";

export const dailyExpenseReportJob = () => {
  cron.schedule("0 10 * * *", async () => {
    console.log("Daily Expense Report Job Started");

    const companies = await CompanyModel.find();

    for (const company of companies) {
      const expenses = await ExpenseModel.find({ companyId: company._id });
      if (!expenses.length) continue;

      const users = await UserModel.find({ companyId: company._id });
      const emails = users.map(u => u.email);

      const pdf = await generateExpensePDF(expenses, company.name);
      await sendEmailWithPDF(emails, pdf, company.name);
    }
  });
};
