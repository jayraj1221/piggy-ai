import { useState } from "react";
import Button from "./button";
import AssignMoneyModal from "./assign-money-modal";

export default function ChildCard({ name, balance, creditScore, totalCreditScore, progress, childId, parentId, onMoneyAssigned }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-semibold">{name}</h4>
        </div>
      </div>
      <p className="text-sm">
        <span className="text-gray-600">Current Balance: </span>
        <span className="font-semibold">{balance.toFixed(2)}</span>
      </p>
      <p className="text-sm text-gray-600">Credit Score: {creditScore}</p>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className="bg-primary h-full rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{progress.toFixed(2)}% complete</span>
        <Button size="sm" onClick={() => setShowModal(true)}>Add Money</Button>
      </div>
      <Button variant="outline" size="sm" className="mt-2">
        View Details
      </Button>

      {showModal && (
        <AssignMoneyModal
          childId={childId}
          parentId={parentId}
          onClose={() => setShowModal(false)}
          onSuccess={onMoneyAssigned}
        />
      )}
    </div>
  );
}
