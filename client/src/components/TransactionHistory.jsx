import React from 'react';


const TransactionHistory = ({ data }) => {

    return (
        <div className="space-y-2">
            {data.length > 0 ? (
                data.map((item) => (
                    
                      
                    <TransactionItem
                        key={item.id}
                        title={item.description || ''}
                        daysAgo={ item.month || new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }) }
                        amount={item.amount}
                        positive={item.amount > 0}
                    />
                ))
            ) : (
                <div className="text-gray-500 text-sm">No Transactions</div>
            )}
        </div>
    );
};

function TransactionItem({ title, daysAgo, amount, positive = false }) {
    console.log('TransactionItem', { title, daysAgo, amount, positive });
    return (
        <div className="flex justify-between items-center bg-white p-4 border rounded-lg shadow-sm">
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-xs text-gray-500">{daysAgo}</p>
            </div>
            <p className={`font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>{amount}</p>
        </div>
    );
}

export default TransactionHistory;
