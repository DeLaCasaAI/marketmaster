
import React, { useState, useEffect } from 'react';
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
import { useIsMobile } from '@/hooks/use-mobile';
import QuickAddFloatingPanel from '@/components/market-master/QuickAddFloatingPanel';
import "@/styles/marketmaster.css";

const MarketMaster: React.FC = () => {
  const { 
    state, 
    addProductToSale, 
    completeSale 
  } = useAppState();
  
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showSaleCompleteModal, setShowSaleCompleteModal] = useState(false);
  const [showSalesReportModal, setShowSalesReportModal] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(true);

  // Log the current event when the component mounts or when state.currentEvent changes
  useEffect(() => {
    console.log('Current event in MarketMaster:', state.currentEvent);
    console.log('All events:', state.events);
  }, [state.currentEvent, state.events]);

  const handleCompleteSale = () => {
    completeSale();
    setShowSaleCompleteModal(true);
  };

  const toggleQuickAdd = () => {
    setShowQuickAdd(!showQuickAdd);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <HeaderSection 
        onNewEvent={() => setShowEventModal(true)}
        onShowSalesReport={() => setShowSalesReportModal(true)}
      />

      {/* Event Info Section */}
      <div className="container mx-auto p-4 space-y-6">
        <EventInfoSection />

        {/* Main Content - Mobile First Layout (Current Sale on top) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Sale - On top for mobile, Right side for desktop */}
          <div className={`${isMobile ? 'order-1' : 'order-2 lg:col-span-2'}`}>
            <CurrentSaleSection 
              onCompleteSale={handleCompleteSale}
              showQuickAdd={false} // Hide in-card quick add on mobile
            />
            {!isMobile && <SalesHistorySection />}
          </div>

          {/* Products & Discounts - Below on mobile, Left side for desktop */}
          <div className={`${isMobile ? 'order-2' : 'order-1 lg:col-span-1'} space-y-6`}>
            <ProductsSection 
              onAddToSale={addProductToSale}
              onAddProduct={() => setShowProductModal(true)}
            />
            <DiscountsSection 
              onAddDiscount={() => setShowDiscountModal(true)}
            />
          </div>
          
          {/* Sales History - Last on mobile */}
          {isMobile && (
            <div className="order-3">
              <SalesHistorySection />
            </div>
          )}
        </div>
      </div>

      {/* Floating Quick Add Panel for Mobile */}
      {isMobile && (
        <QuickAddFloatingPanel 
          onAddToSale={addProductToSale}
          visible={showQuickAdd}
          onToggle={toggleQuickAdd}
        />
      )}

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
