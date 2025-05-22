
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from './LanguageContext';
import DiscountList from './DiscountList';

interface DiscountsSectionProps {
  onAddDiscount: () => void;
}

const DiscountsSection: React.FC<DiscountsSectionProps> = ({ onAddDiscount }) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            <DollarSign className="inline mr-2 text-yellow-500" /> {t('discountPacksTitle')}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50"
            onClick={onAddDiscount}
          >
            <Plus size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DiscountList />
      </CardContent>
    </Card>
  );
};

export default DiscountsSection;
