
import React, { useState } from 'react';
import { useAppState } from './AppStateContext';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import EventSelector from './EventSelector';

const SalesHistory: React.FC = () => {
  const { state, getSalesByEventId } = useAppState();
  const { t } = useLanguage();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const salesData = selectedEventId !== null 
    ? getSalesByEventId(selectedEventId)
    : state.salesHistory;
  
  if (salesData.length === 0) {
    return (
      <div>
        <div className="mb-4">
          <EventSelector value={selectedEventId} onEventChange={setSelectedEventId} />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderTime')}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderItems')}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderPayment')}</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderTotal')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-gray-500 italic">
                  {t('noSales')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <div className="mb-4">
        <EventSelector value={selectedEventId} onEventChange={setSelectedEventId} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderTime')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderItems')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderPayment')}</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">{t('tableHeaderTotal')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map(sale => {
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
                    {methodIcon} {t(sale.paymentMethod === 'cash' ? 'paymentCash' : sale.paymentMethod === 'transfer' ? 'paymentCard' : 'paymentVenmo')}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold">${sale.total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;
