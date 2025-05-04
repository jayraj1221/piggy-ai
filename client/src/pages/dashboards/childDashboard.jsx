import { motion } from "framer-motion";
import { CircleDollarSign, LogOut } from "lucide-react";

export default function ChildDashboard() {
  const balance = 125.75;
  const savings = 75.0;
  const activityCount = 3;

  const goals = [
    { name: "New Bicycle", target: 200, saved: 125, startDate: "May 1" },
    { name: "Summer Camp", target: 150, saved: 30, startDate: "June 15" },
  ];

  const activities = [
    { label: "Weekly Allowance", amount: 10, date: "2 days ago" },
    { label: "Comic Book", amount: -4.99, date: "4 days ago" },
    { label: "Birthday Gift", amount: 20, date: "1 week ago" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 text-black p-6 space-y-8"
    >
      {/* Navbar */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-green-600">
          <CircleDollarSign className="h-6 w-6" />
          Piggy AI
        </div>
        <nav className="flex items-center gap-6">
          <a className="text-green-600 font-semibold underline" href="#">Dashboard</a>
          <a href="#">Goals</a>
          <a href="#">Expenses</a>
        </nav>
        <button className="flex items-center gap-1 text-red-500">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </header>

      <section className="text-2xl font-bold">Hi, Alex!</section>

      {/* Summary Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="My Balance"
          description="Available to spend"
          value={`$${balance.toFixed(2)}`}
          note="+$10.00 from last week"
          highlighted
        />
        <SummaryCard
          title="Savings"
          description="For your goals"
          value={`$${savings.toFixed(2)}`}
          note="63% to your bicycle goal"
        />
        <SummaryCard
          title="This Week"
          description="Your activity"
          value={activityCount}
          note="Transactions this week"
        />
      </section>

      <div className="flex justify-end">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold shadow">
          Add Expense
        </button>
      </div>

      {/* Goals Section */}
      <section>
        <h2 className="text-xl font-bold mb-4">My Savings Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = Math.min((goal.saved / goal.target) * 100, 100);
            return (
              <div key={goal.name} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{goal.name}</h3>
                  <p className="text-sm text-gray-500">
                    Target: ${goal.target.toFixed(2)}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-600">Progress</div>
                <div className="h-3 w-full bg-gray-200 rounded">
                  <div
                    className="h-full bg-green-500 rounded"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Started: {goal.startDate}</span>
                  <span>
                    ${goal.saved.toFixed(2)} / ${goal.target.toFixed(2)}
                  </span>
                </div>
                <button className="w-full border rounded py-1 mt-2 hover:bg-gray-100">
                  Add Savings
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="flex gap-4 mb-4">
          {["All", "Money In", "Money Out"].map((type) => (
            <button
              key={type}
              className="px-4 py-1 border rounded-full text-sm text-gray-700 hover:bg-gray-100"
            >
              {type}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow divide-y">
          {activities.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-3"
            >
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
              <p
                className={`font-semibold ${
                  item.amount >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.amount >= 0 ? "+" : "-"}${Math.abs(item.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button className="border px-4 py-1 rounded hover:bg-gray-100 text-sm">
            View All Activity
          </button>
        </div>
      </section>
    </motion.div>
  );
}

// --- Reusable Summary Card ---
function SummaryCard({ title, description, value, note, highlighted = false }) {
  return (
    <div
      className={`p-6 rounded-xl shadow ${
        highlighted ? "border border-green-400" : "bg-white"
      }`}
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <p className="text-xs text-green-600 mt-1">{note}</p>
    </div>
  );
}
