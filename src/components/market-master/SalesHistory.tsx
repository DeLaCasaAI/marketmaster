
import React from 'react';
import { useAppState } from './AppStateContext';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';

const SalesHistory: React.FC = () => {
  const { state } = useAppState();

  if (state.salesHistory.length === 0) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-4 text-center text-gray-500 italic">
                No sales recorded yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {state.salesHistory.map(sale => {
            const itemsList = sale.items.map(item => 
              `${item.quantity} × ${item.name}`
            ).join(', ');
            
            let methodIcon;
            if (sale.paymentMethod === 'cash') {
              methodIcon = <Banknote className="inline mr-1" size={14} />;
            } else if (sale.paymentMethod === 'transfer') {
              methodIcon = <CreditCard className="inline mr-1" size={14} />;
            } else if (sale.paymentMethod === 'nequi') {
              methodIcon = <Smartphone className="inline mr-1" size={14} />;
            }
            
            return (
              <tr key={sale.id}>
                <td className="px-4 py-3 text-sm">{formatDate(sale.timestamp)}</td>
                <td className="px-4 py-3 text-sm">{itemsList}</td>
                <td className="px-4 py-3 text-sm">
                  {methodIcon} {sale.paymentMethod}
                </td>
                <td className="px-4 py-3 text-sm font-bold">${sale.total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
