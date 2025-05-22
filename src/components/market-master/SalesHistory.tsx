
import React, { useState } from 'react';
import { useAppState } from './AppStateContext';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import EventSelector from './EventSelector';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const SalesHistory: React.FC = () => {
  const { state, getSalesByEventId } = useAppState();
  const { t } = useLanguage();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const salesData = selectedEventId !== null 
    ? getSalesByEventId(selectedEventId)
    : state.salesHistory;
  
  const formatDateTime = (isoString: string) => {
    try {
      const date = parseISO(isoString);
      return format(date, 'MMM d, yyyy h:mm a');
    } catch (error) {
      console.error('Error formatting date:', error);
      return isoString;
    }
  };

  if (salesData.length === 0) {
    return (
      <div>
        <div className="mb-4">
          <EventSelector value={selectedEventId} onEventChange={setSelectedEventId} />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('tableHeaderDateTime')}</TableHead>
                <TableHead>{t('tableHeaderItems')}</TableHead>
                <TableHead>{t('tableHeaderPayment')}</TableHead>
                <TableHead>{t('tableHeaderTotal')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 italic">
                  {t('noSales')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <EventSelector value={selectedEventId} onEventChange={setSelectedEventId} />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('tableHeaderDateTime')}</TableHead>
              <TableHead>{t('tableHeaderItems')}</TableHead>
              <TableHead>{t('tableHeaderPayment')}</TableHead>
              <TableHead>{t('tableHeaderTotal')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                <TableRow key={sale.id}>
                  <TableCell className="text-sm">{formatDateTime(sale.timestamp)}</TableCell>
                  <TableCell className="text-sm">{itemsList}</TableCell>
                  <TableCell className="text-sm">
                    {methodIcon} {t(sale.paymentMethod === 'cash' ? 'paymentCash' : sale.paymentMethod === 'transfer' ? 'paymentCard' : 'paymentVenmo')}
                  </TableCell>
                  <TableCell className="text-sm font-bold">${sale.total.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesHistory;
