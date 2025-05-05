import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import TransactionHistory from '../../components/TransactionHistory';
import axios from 'axios';

export default function ChildDashboard() {
  const { user, loading } = useUser();

  const [TransactionItems, setTransactionItems] = useState([]);
  const [pocketMoneyHistory, setPocketMoneyHistory] = useState([]);
  const [History, setHistory] = useState(true);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (user) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/ml/getTransactionHistory`,
            { userId: user.id }
          );

          if (Array.isArray(response.data)) {
            setTransactionItems(response.data);
          } else {
            setTransactionItems([]);
          }
        } catch (error) {
          console.error('Failed to fetch transactions:', error);
          setTransactionItems([]);
        }
      }
    };

    const fetchPocketMoneyHistory = async () => {
      if (user) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVER_URL}/ml/getPocketMoneyHistory`,
            { userId: user.id }
          );

          if (Array.isArray(response.data)) {
            setPocketMoneyHistory(response.data);
          } else {
            setPocketMoneyHistory([]);
          }
        } catch (error) {
          console.error('Failed to fetch transactions:', error);
          setPocketMoneyHistory([]);
        }
      }
    };

    fetchTransactionHistory();
    fetchPocketMoneyHistory();
  }, [user]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="min-h-screen bg-white px-6 py-4 text-gray-800">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Hi, {user.name}!</h1>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Expense
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card
          title="My Balance"
          value={`₹ ${user.pocketMoney || 0}`}
          subtitle={`+₹10.00 from last week`}
        />
        <Card
          title="Credit Score"
          value={user.creditScore || 0}
          subtitle={user.creditScore > 700 ? '+15 points this month' : 'Keep improving!'}
        />
        <Card
          title="Monthly Spending"
          value={`₹${user.monthlySpending || 0}`}
          subtitle={`45% of your monthly limit`}
        />
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-xl p-5 border flex  flex-col space-y-10">
          <h2 className="text-lg font-semibold mb-2">Credit Score</h2>
          <div className="flex items-center space-x-6 justify-center">
            <div>
              <CreditRing score={user.creditScore || 0} max={100} />
            </div>
            <div>
              <p className="text-md text-gray-700 font-semibold">
                {user.creditScore >= 75
                  ? 'Excellent'
                  : user.creditScore >= 50
                    ? 'Good'
                    : 'Needs Work'}
              </p>
              <progress className="w-48 mt-2" value={user.creditScore} max="100" />
              <p className="text-xs text-gray-500 mt-1">How to Improve</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 border">
          <h2 className="text-lg font-semibold mb-2">Credit Factors</h2>
          <p className="text-sm text-gray-500 mb-4">What affects your score</p>
          <Factor label="Payment History" level="Excellent" percent={95} />
          <Factor label="Spending Habits" level="Good" percent={75} />
          <Factor label="Savings Rate" level="Fair" percent={55} color="yellow" />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        <div className="flex gap-3 mb-4 text-sm">
          <button
            onClick={() => setHistory(true)}
            className={`px-3 py-1 rounded-full ${History ? 'bg-green-100 text-green-700' : 'text-gray-600'
              }`}
          >
            Spend Money
          </button>

          <button
            onClick={() => setHistory(false)}
            className={`px-3 py-1 rounded-full ${!History ? 'bg-green-100 text-green-700' : 'text-gray-600'
              }`}
          >
            Pocket Money
          </button>
        </div>

        <TransactionHistory data={History ? TransactionItems : pocketMoneyHistory} />
      </section>


    </div>
  );
}


function Card({ title, value, subtitle }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-green-600 mt-1">{subtitle}</p>
    </div>
  );
}

function Factor({ label, level, percent, color = 'green' }) {
  const colorMap = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{label}</span>
        <span>{level}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${colorMap[color]} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}


function CreditRing({ score = 720, max = 850 }) {
  const radius = 70;
  const stroke = 10;
  const normalizedScore = Math.min(score, max);
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedScore / max) * circumference;
  const offset = circumference - progress;
  const size = radius * 2 + stroke * 2;
  const center = size / 2;

  return (
    <svg width={size} height={size}>
      {/* Background ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#E5E7EB"
        strokeWidth={stroke}
        fill="none"
      />
      {/* Rotated progress ring */}
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#22C55E"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </g>
      {/* Text remains upright */}
      <text
        x="50%"
        y="50%"
        dy="0.35em"
        textAnchor="middle"
        className="fill-green-600 font-bold"
        fontSize="20"
      >
        {score}
      </text>
    </svg>
  );
}
