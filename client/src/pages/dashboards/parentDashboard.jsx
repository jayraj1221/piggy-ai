import { useState } from "react";
import { LogOut, CircleDollarSign } from "lucide-react";
import Button from "../../components/button";
import { Logo } from "../../components/logo";
export default function ParentDashboard() {
  const [filter, setFilter] = useState("All");

  const transactions = [
    { id: 1, type: "deposit", child: "Alex", label: "Weekly Allowance", amount: 10, date: "2 days ago" },
    { id: 2, type: "withdrawal", child: "Jamie", label: "Toy Store Purchase", amount: -15.99, date: "3 days ago" },
    { id: 3, type: "deposit", child: "Jamie", label: "Chores Bonus", amount: 5, date: "5 days ago" },
  ];

  const filteredTransactions = filter === "All"
    ? transactions
    : transactions.filter((t) =>
        filter === "Deposits" ? t.amount > 0 : t.amount < 0
      );

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6 space-y-8">
      {/* Navbar */}
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-xl font-bold text-primary">
          <Logo/>
        </div>
        <nav className="flex items-center gap-6">
          <a className="text-primary font-semibold underline" href="#">Dashboard</a>
          <a href="#">Transactions</a>
          <a href="#">Children</a>
          <a href="#">Settings</a>
        </nav>
        <button className="flex items-center gap-1 text-red-500">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" value="$245.50" note="+$25.00 from last week" />
        <SummaryCard title="Savings Goals" value="4" note="2 goals nearly complete" />
        <SummaryCard title="Recent Activity" value="12" note="Transactions processed" />
      </section>

      <div className="flex justify-end">
        <Button>Add Pocket Money</Button>
      </div>

      {/* Children Overview */}
      <section>
        <h2 className="text-xl font-bold mb-4">Children Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChildCard
            name="Alex"
            age={10}
            balance={125.75}
            goal="Bicycle"
            goalAmount={200}
            progress={63}
          />
          <ChildCard
            name="Jamie"
            age={8}
            balance={119.75}
            goal="Video Game"
            goalAmount={150}
            progress={80}
          />
        </div>
      </section>

      {/* Recent Transactions */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="flex gap-4 mb-4">
          {["All", "Deposits", "Withdrawals"].map((type) => (
            <button
              key={type}
              className={`px-4 py-1 rounded-full border ${
                filter === type ? "bg-blue-100 text-primary" : "text-gray-600"
              }`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="space-y-2 bg-white rounded-lg shadow p-4">
          {filteredTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center border-b last:border-none py-2"
            >
              <div>
                <p className="font-medium">{tx.label}</p>
                <p className="text-sm text-gray-500">
                  {tx.child} • {tx.date}
                </p>
              </div>
              <p
                className={`font-semibold ${
                  tx.amount >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {tx.amount >= 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button variant="outline">View All Transactions</Button>
        </div>
      </section>
    </div>
  );
}

// --- Reusable Components ---
function SummaryCard({ title, value, note }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-2">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-xs text-green-600">{note}</p>
    </div>
  );
}

function ChildCard({ name, age, balance, goal, goalAmount, progress }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-sm text-gray-500">Age: {age}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Savings Goal</p>
          <p className="font-bold">${goalAmount.toFixed(2)}</p>
        </div>
      </div>
      <p className="text-sm">
        <span className="text-gray-600">Current Balance: </span>
        <span className="font-semibold">${balance.toFixed(2)}</span>
      </p>
      <p className="text-sm text-gray-600">Goal Progress: {goal}</p>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className="bg-primary h-full rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{progress}% complete</span>
        <Button size="sm">Add Money</Button>
      </div>
      <Button variant="outline" size="sm" className="mt-2">
        View Details
      </Button>
    </div>
  );
}
