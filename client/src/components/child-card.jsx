import Button from "./button";
export default function ChildCard({ name, age, balance, goal, goalAmount, progress }) {
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