import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function AddExpense() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const save = () => {
    const list = JSON.parse(localStorage.getItem("expenses")) || [];
    list.push({ id: Date.now(), title, amount, companyId: user.companyId });
    localStorage.setItem("expenses", JSON.stringify(list));
    navigate("/expenses");
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add Expense
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Record a new expense for your company
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expense Title
            </label>
            <input
              type="text"
              placeholder="e.g. Office Supplies"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                ₹
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-7 pr-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <button
            onClick={save}
            disabled={!title || !amount}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
