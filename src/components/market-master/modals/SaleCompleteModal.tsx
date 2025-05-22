
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SaleCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  paymentMethod: string;
}

const SaleCompleteModal: React.FC<SaleCompleteModalProps> = ({ isOpen, onClose, total, paymentMethod }) => {
  const { t } = useLanguage();
  
  const getPaymentMethodTranslation = (method: string): string => {
    if (method === 'cash') return t('paymentCash');
    if (method === 'transfer') return t('paymentCard');
    if (method === 'nequi') return t('paymentVenmo');
    return method;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm text-center">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t('saleCompleteModalTitle')}</h3>
          <p className="text-gray-600">{t('saleCompleteTotalLabel')} <span className="font-bold">${total.toFixed(2)}</span></p>
          <p className="text-gray-600">{t('saleCompletePaidWithLabel')} <span className="font-bold">{getPaymentMethodTranslation(paymentMethod)}</span></p>
        </div>
        
        <DialogFooter className="justify-center">
          <Button 
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 px-6"
          >
            {t('doneButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaleCompleteModal;
