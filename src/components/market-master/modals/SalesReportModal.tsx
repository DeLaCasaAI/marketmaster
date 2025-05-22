
import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useAppState } from '../AppStateContext';
import Chart from 'chart.js/auto';

interface SalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalesReportModal: React.FC<SalesReportModalProps> = ({ isOpen, onClose }) => {
  const { state } = useAppState();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Calculate total sales, profit, and transaction count
  const calculateStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = state.salesHistory.filter(sale => {
      const saleDate = new Date(sale.timestamp);
      return saleDate >= today;
    });

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

    const totalSales = todaySales.reduce((sum, sale) => sum + sale.total, 0);
    const totalProfit = todaySales.reduce((sum, sale) => sum + calculateSaleProfit(sale), 0);
    const transactionCount = todaySales.length;

    return { totalSales, totalProfit, transactionCount };
  };
  
  // Create chart with hourly sales data
  const createChart = () => {
    if (!chartRef.current) return;

    // Clean up any previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get today's sales
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaySales = state.salesHistory.filter(sale => {
      const saleDate = new Date(sale.timestamp);
      return saleDate >= today;
    });

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
    todaySales.forEach(sale => {
      const hour = new Date(sale.timestamp).getHours();
      hourlySales[hour] += sale.total;
      hourlyProfit[hour] += calculateSaleProfit(sale);
    });
    
    // Convert to arrays for chart
    const hours = Array.from({length: 24}, (_, i) => i);
    const salesData = hours.map(h => hourlySales[h]);
    const profitData = hours.map(h => hourlyProfit[h]);

    // Create chart
    chartInstance.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: hours.map(h => `${h}:00`),
        datasets: [
          {
            label: 'Sales ($)',
            data: salesData,
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
            text: 'Hourly Sales Performance'
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

  // Create/update chart when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => createChart(), 100);
    }
  }, [isOpen]);

  const stats = calculateStats();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl h-auto">
        <DialogHeader>
          <DialogTitle>Sales Report: {state.currentEvent?.name || "Today's Sales"}</DialogTitle>
        </DialogHeader>

        <div className="mb-6">
          <p className="text-gray-600">
            <span>Location: </span>
            <span className="font-medium">{state.currentEvent?.location || 'N/A'}</span>
          </p>
          <p className="text-gray-600">
            <span>Date: </span>
            <span className="font-medium">
              {state.currentEvent ? new Date(state.currentEvent.startDate).toLocaleDateString() : new Date().toLocaleDateString()}
            </span>
          </p>
          
          <div className="mt-4 flex flex-wrap justify-between gap-4">
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-gray-500">Total Profit</p>
              <p className="text-2xl font-bold">${stats.totalProfit.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex-1">
              <p className="text-sm text-gray-500">Transactions</p>
              <p className="text-2xl font-bold">{stats.transactionCount}</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
            <Select defaultValue="today">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <canvas ref={chartRef} width="400" height="200"></canvas>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="bg-gray-600 hover:bg-gray-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SalesReportModal;
