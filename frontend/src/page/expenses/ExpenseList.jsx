import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function ExpenseList() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(all.filter((e) => e.companyId === user.companyId));
  }, [user]);

  const totalAmount = expenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Expenses
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            All expenses for your company
          </p>
        </div>

        <div className="mt-4 sm:mt-0 bg-white border rounded-lg px-4 py-2 shadow-sm">
          <p className="text-xs text-gray-500">Total Expenses</p>
          <p className="text-lg font-semibold text-gray-800">
            ₹{totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {expenses.length === 0 && (
        <div className="bg-white border rounded-xl p-10 text-center shadow-sm">
          <p className="text-gray-500 text-sm">
            No expenses found for your company.
          </p>
        </div>
      )}

      {/* Expense Cards */}
      {expenses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {expenses.map((e) => (
            <div
              key={e.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {e.title}
                </h3>
                <span className="text-sm font-semibold text-green-600">
                  ₹{Number(e.amount).toLocaleString()}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Expense ID: {e.id}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                  Company Expense
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
