function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Overview of your company expenses
          </p>
        </div>

        <div className="mt-4 sm:mt-0 px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full w-fit">
          Active
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Expenses */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-2">
            ₹12,450
          </h3>
          <p className="text-xs text-green-600 mt-1">
            +8% from last month
          </p>
        </div>

        {/* Monthly Expenses */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500">This Month</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-2">
            ₹3,280
          </h3>
          <p className="text-xs text-red-500 mt-1">
            −2% from last month
          </p>
        </div>

        {/* Users */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500">Team Members</p>
          <h3 className="text-2xl font-semibold text-gray-800 mt-2">
            7
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Admin · Managers · Agents
          </p>
        </div>
      </div>

      {/* Report Info */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-start gap-4">
        <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600">
          ⏰
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-800">
            Scheduled Report
          </h4>
          <p className="text-sm text-blue-600 mt-1">
            Daily expense report is automatically sent at
            <span className="font-semibold"> 10:00 AM</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const input = "w-full border p-2 rounded";
const btn = "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600";