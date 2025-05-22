
import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppState } from '../AppStateContext';
import { useLanguage } from '../LanguageContext';
import Chart from 'chart.js/auto';
import EventSelector from '../EventSelector';

interface SalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalesReportModal: React.FC<SalesReportModalProps> = ({ isOpen, onClose }) => {
  const { state, getSalesByEventId } = useAppState();
  const { t } = useLanguage();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  // Calculate total sales, profit, and transaction count
  const calculateStats = () => {
    let salesData;
    
    if (selectedEventId !== null) {
      salesData = getSalesByEventId(selectedEventId);
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      salesData = state.salesHistory.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= today;
      });
    }

    // Calculate profit for a sale
    const calculateSaleProfit = (sale: any) => {
      return sale.items.reduce((profit: number, item: any) => {
        const product = state.products.find(p => p.id === item.productId);
        if (product) {
          return profit + ((item.price - product.cost) * item.quantity);
        }
        return profit;
      }, 0);
    };

    const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0);
    const totalProfit = salesData.reduce((sum, sale) => sum + calculateSaleProfit(sale), 0);
    const transactionCount = salesData.length;

    return { totalSales, totalProfit, transactionCount };
  };
  
  // Create chart with hourly sales data
  const createChart = () => {
    if (!chartRef.current) return;

    // Clean up any previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get sales data
    let salesData;
    
    if (selectedEventId !== null) {
      salesData = getSalesByEventId(selectedEventId);
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      salesData = state.salesHistory.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate >= today;
      });
    }

    // Calculate profit for a sale
    const calculateSaleProfit = (sale: any) => {
      return sale.items.reduce((profit: number, item: any) => {
        const product = state.products.find(p => p.id === item.productId);
        if (product) {
          return profit + ((item.price - product.cost) * item.quantity);
        }
        return profit;
      }, 0);
    };

    // Initialize hours with 0 values
    const hourlySales: {[key: number]: number} = {};
    const hourlyProfit: {[key: number]: number} = {};
    
    for (let i = 0; i < 24; i++) {
      hourlySales[i] = 0;
      hourlyProfit[i] = 0;
    }
    
    // Aggregate sales by hour
    salesData.forEach(sale => {
      const hour = new Date(sale.timestamp).getHours();
      hourlySales[hour] += sale.total;
      hourlyProfit[hour] += calculateSaleProfit(sale);
    });
    
    // Convert to arrays for chart
    const hours = Array.from({length: 24}, (_, i) => i);
    const salesDataArray = hours.map(h => hourlySales[h]);
    const profitData = hours.map(h => hourlyProfit[h]);

    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: hours.map(h => `${h}:00`),
        datasets: [
          {
            label: 'Sales ($)',
            data: salesDataArray,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Profit ($)',
            data: profitData,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: selectedEventId 
              ? state.events.find(e => e.id === selectedEventId)?.name || 'Event Sales' 
              : 'Today\'s Sales Performance'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  // Create/update chart when modal opens or event selection changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => createChart(), 100);
    }
  }, [isOpen, selectedEventId]);

  const stats = calculateStats();
  
  const getSelectedEventName = () => {
    if (selectedEventId === null) {
      return null;
    }
    return state.events.find(e => e.id === selectedEventId)?.name || '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl h-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedEventId ? getSelectedEventName() : t('todaysSaleReport')}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('selectEventLabel')}</label>
            <EventSelector value={selectedEventId} onEventChange={setSelectedEventId} />
          </div>

          {selectedEventId !== null && (
            <p className="text-gray-600 mt-2">
              <span>{t('locationLabel')}: </span>
              <span className="font-medium">
                {state.events.find(e => e.id === selectedEventId)?.location || 'N/A'}
              </span>
            </p>
          )}
          
          <div className="mt-4 flex flex-wrap justify-between gap-4">
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-gray-500">{t('totalSalesLabel')}</p>
              <p className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-gray-500">{t('totalProfitLabel')}</p>
              <p className="text-2xl font-bold">${stats.totalProfit.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-gray-500">{t('transactionsLabel')}</p>
              <p className="text-2xl font-bold">{stats.transactionCount}</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <canvas ref={chartRef} width="400" height="200"></canvas>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="bg-gray-600 hover:bg-gray-700">
            {t('closeButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalesReportModal;
