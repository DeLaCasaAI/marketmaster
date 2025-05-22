
import React, { useState, useEffect, useRef } from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Trash2, 
  Edit, 
  ShoppingBag, 
  Store, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  BarChart3, 
  Download, 
  Upload, 
  Check
} from "lucide-react";
import ProductList from '@/components/market-master/ProductList';
import DiscountList from '@/components/market-master/DiscountList';
import Receipt from '@/components/market-master/Receipt';
import QuickAddButtons from '@/components/market-master/QuickAddButtons';
import PaymentMethods from '@/components/market-master/PaymentMethods';
import SalesHistory from '@/components/market-master/SalesHistory';
import ProductModal from '@/components/market-master/modals/ProductModal';
import DiscountModal from '@/components/market-master/modals/DiscountModal';
import EventModal from '@/components/market-master/modals/EventModal';
import SaleCompleteModal from '@/components/market-master/modals/SaleCompleteModal';
import SalesReportModal from '@/components/market-master/modals/SalesReportModal';
import { useAppState } from '@/components/market-master/AppStateContext';
import "@/styles/marketmaster.css";

const MarketMaster: React.FC = () => {
  const { 
    state, 
    addProductToSale, 
    clearCurrentSale, 
    completeSale,
    setPaymentMethod,
    calculateTodaysSales
  } = useAppState();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSaleCompleteModal, setShowSaleCompleteModal] = useState(false);
  const [showSalesReportModal, setShowSalesReportModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Event listener for clicking outside the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const menuButton = document.getElementById('menuButton');
      const menuDropdown = document.getElementById('menuDropdown');
      
      if (menuOpen && 
          menuButton && 
          menuDropdown && 
          !menuButton.contains(event.target as Node) && 
          !menuDropdown.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleExportData = () => {
    const data = JSON.stringify({
      products: state.products,
      discounts: state.discounts,
      salesHistory: state.salesHistory,
      currentEvent: state.currentEvent,
      eventStartDate: state.eventStartDate,
      eventEndDate: state.eventEndDate
    });
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marketmaster_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
    setMenuOpen(false);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result === 'string') {
            // This would be handled in the AppStateContext
            // updateStateFromImport(JSON.parse(result));
            toast.success("Data imported successfully");
          }
        } catch (error) {
          toast.error("Error importing data");
        }
      };
      reader.readAsText(file);
    };
    input.click();
    setMenuOpen(false);
  };

  const handleCompleteSale = () => {
    if (state.currentSale.items.length === 0) {
      toast.error("Cannot complete an empty sale");
      return;
    }
    
    completeSale();
    setShowSaleCompleteModal(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-700">
              <Store className="inline mr-2" />
              MarketMaster
            </h1>
            <p className="text-gray-600">Track your farmer's market sales with ease</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <span className="text-gray-500">Today's Sales:</span>
              <span className="font-bold text-green-600 ml-2">${calculateTodaysSales().toFixed(2)}</span>
            </div>
            <div className="relative">
              <Button 
                id="menuButton"
                onClick={() => setMenuOpen(!menuOpen)} 
                className="bg-green-600 hover:bg-green-700"
              >
                <span className="mr-2">Menu</span>
              </Button>
              
              {menuOpen && (
                <div id="menuDropdown" className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button 
                      onClick={() => { setShowEventModal(true); setMenuOpen(false); }}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                    >
                      <Plus className="inline mr-2 h-4 w-4" /> New Event
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button 
                      onClick={() => { setShowSalesReportModal(true); setMenuOpen(false); }}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                    >
                      <BarChart3 className="inline mr-2 h-4 w-4" /> Today's Sale Report
                    </button>
                    <button 
                      onClick={handleExportData}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                    >
                      <Download className="inline mr-2 h-4 w-4" /> Export Data
                    </button>
                    <button 
                      onClick={handleImportData}
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                    >
                      <Upload className="inline mr-2 h-4 w-4" /> Import Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Event Info Section */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {state.currentEvent?.name || "No Event Selected"}
              </h2>
              <p className="text-gray-600">{state.currentEvent?.location || "Create a new event to begin"}</p>
            </div>
            <div className="mt-2 md:mt-0">
              {state.currentEvent && (
                <p className="text-gray-600 font-medium">
                  {new Date(state.currentEvent.startDate).toLocaleDateString()} - {new Date(state.currentEvent.endDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Products & Discounts */}
        <div className="lg:col-span-1 space-y-6">
          {/* Product List */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  <ShoppingBag className="inline mr-2 text-green-600" /> Products
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-green-600 hover:text-green-800 hover:bg-green-50"
                  onClick={() => setShowProductModal(true)}
                >
                  <Plus size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ProductList onAddToSale={addProductToSale} />
            </CardContent>
          </Card>

          {/* Discount Packs */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  <DollarSign className="inline mr-2 text-yellow-500" /> Discount Packs
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
                  onClick={() => setShowDiscountModal(true)}
                >
                  <Plus size={18} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DiscountList />
            </CardContent>
          </Card>
        </div>

        {/* Middle and Right Columns - Sales Interface */}
        <div className="lg:col-span-2">
          {/* Current Sale */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">
                  <CreditCard className="inline mr-2 text-blue-500" /> Current Sale
                </CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={clearCurrentSale}
                  >
                    Clear
                  </Button>
                  <Button 
                    onClick={handleCompleteSale}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Complete Sale
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Receipt Area */}
              <Receipt />
              
              {/* Quick Add Buttons */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">QUICK ADD</h3>
                <QuickAddButtons onAddToSale={addProductToSale} />
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">PAYMENT METHOD</h3>
                <PaymentMethods 
                  selected={state.currentSale.paymentMethod}
                  onChange={setPaymentMethod}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sales History */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                <Calendar className="inline mr-2 text-purple-500" /> Today's Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SalesHistory />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ProductModal 
        isOpen={showProductModal} 
        onClose={() => setShowProductModal(false)} 
      />
      
      <DiscountModal 
        isOpen={showDiscountModal} 
        onClose={() => setShowDiscountModal(false)} 
      />
      
      <EventModal 
        isOpen={showEventModal} 
        onClose={() => setShowEventModal(false)} 
      />
      
      <SaleCompleteModal 
        isOpen={showSaleCompleteModal} 
        onClose={() => setShowSaleCompleteModal(false)}
        total={state.currentSale.total}
        paymentMethod={state.currentSale.paymentMethod}
      />
      
      <SalesReportModal 
        isOpen={showSalesReportModal} 
        onClose={() => setShowSalesReportModal(false)}
      />
    </div>
  );
};

export default MarketMaster;
