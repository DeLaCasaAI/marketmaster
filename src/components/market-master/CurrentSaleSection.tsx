
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';
import Receipt from './Receipt';
import QuickAddButtons from './QuickAddButtons';
import PaymentMethods from './PaymentMethods';
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';

interface CurrentSaleSectionProps {
  onCompleteSale: () => void;
  showQuickAdd?: boolean;
}

const CurrentSaleSection: React.FC<CurrentSaleSectionProps> = ({ 
  onCompleteSale,
  showQuickAdd = true 
}) => {
  const { state, addProductToSale, clearCurrentSale, setPaymentMethod } = useAppState();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  const handleCompleteSale = () => {
    if (state.currentSale.items.length === 0) {
      toast.error(t('emptyReceiptMessage'));
      return;
    }
    
    onCompleteSale();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            <CreditCard className="inline mr-2 text-blue-500" /> {t('currentSaleTitle')}
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={clearCurrentSale}
            >
              {t('clearSaleButton')}
            </Button>
            <Button 
              onClick={handleCompleteSale}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t('completeSaleButton')}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Receipt Area */}
        <Receipt />
        
        {/* Quick Add Buttons - Only show if showQuickAdd is true */}
        {showQuickAdd && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">{t('quickAddTitle')}</h3>
            <QuickAddButtons onAddToSale={addProductToSale} />
          </div>
        )}

        {/* Payment Method */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-2">{t('paymentMethodTitle')}</h3>
          <PaymentMethods 
            selected={state.currentSale.paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentSaleSection;
