
import React, { useState } from 'react';
import { useAppState } from '@/components/market-master/AppStateContext';
import { useLanguage } from '@/components/market-master/LanguageContext';
import HeaderSection from '@/components/market-master/HeaderSection';
import EventInfoSection from '@/components/market-master/EventInfoSection';
import ProductsSection from '@/components/market-master/ProductsSection';
import DiscountsSection from '@/components/market-master/DiscountsSection';
import CurrentSaleSection from '@/components/market-master/CurrentSaleSection';
import SalesHistorySection from '@/components/market-master/SalesHistorySection';
import ProductModal from '@/components/market-master/modals/ProductModal';
import DiscountModal from '@/components/market-master/modals/DiscountModal';
import EventModal from '@/components/market-master/modals/EventModal';
import SaleCompleteModal from '@/components/market-master/modals/SaleCompleteModal';
import SalesReportModal from '@/components/market-master/modals/SalesReportModal';
import "@/styles/marketmaster.css";

const MarketMaster: React.FC = () => {
  const { 
    state, 
    addProductToSale, 
    completeSale 
  } = useAppState();
  
  const { t } = useLanguage();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSaleCompleteModal, setShowSaleCompleteModal] = useState(false);
  const [showSalesReportModal, setShowSalesReportModal] = useState(false);

  const handleCompleteSale = () => {
    completeSale();
    setShowSaleCompleteModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderSection 
        onNewEvent={() => setShowEventModal(true)}
        onShowSalesReport={() => setShowSalesReportModal(true)}
      />

      {/* Event Info Section */}
      <div className="container mx-auto p-4 space-y-6">
        <EventInfoSection />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Products & Discounts */}
          <div className="lg:col-span-1 space-y-6">
            <ProductsSection 
              onAddToSale={addProductToSale}
              onAddProduct={() => setShowProductModal(true)}
            />
            <DiscountsSection 
              onAddDiscount={() => setShowDiscountModal(true)}
            />
          </div>

          {/* Middle and Right Columns - Sales Interface */}
          <div className="lg:col-span-2">
            <CurrentSaleSection 
              onCompleteSale={handleCompleteSale}
            />
            <SalesHistorySection />
          </div>
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
