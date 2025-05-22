
import React from 'react';
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard, Smartphone } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useLanguage } from './LanguageContext';

interface PaymentMethodsProps {
  selected: string;
  onChange: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ selected, onChange }) => {
  const { t } = useLanguage();
  
  const methods = [
    { id: 'cash', label: t('paymentCash'), icon: <Banknote className="mr-2" size={16} /> },
    { id: 'transfer', label: t('paymentCard'), icon: <CreditCard className="mr-2" size={16} /> },
    { id: 'nequi', label: t('paymentVenmo'), icon: <Smartphone className="mr-2" size={16} /> }
  ];

  return (
    <div className="flex space-x-2">
      {methods.map(method => (
        <Button
          key={method.id}
          variant="outline"
          className={cn(
            "flex-1 justify-center",
            selected === method.id && "ring-2 ring-offset-2 ring-blue-500"
          )}
          onClick={() => onChange(method.id)}
        >
          {method.icon}
          {method.label}
        </Button>
      ))}
    </div>
  );
};

export default PaymentMethods;
