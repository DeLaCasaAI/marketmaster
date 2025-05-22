
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';
import { useAppState } from './AppStateContext';
import DiscountModal from './modals/DiscountModal';
import { useLanguage } from './LanguageContext';

const DiscountList: React.FC = () => {
  const { state, deleteDiscount } = useAppState();
  const { t } = useLanguage();
  const [editingDiscount, setEditingDiscount] = useState<number | null>(null);

  if (state.discounts.length === 0) {
    return <div className="text-gray-500 italic">{t('noDiscounts')}</div>;
  }

  return (
    <div className="space-y-3">
      {state.discounts.map(discount => {
        const product = state.products.find(p => p.id === discount.productId);
        const productName = product ? product.name : t('selectProductPlaceholder');
        
        let discountText = '';
        if (discount.type === 'bundle') {
          discountText = `${discount.params.quantity} for $${discount.params.price?.toFixed(2)}`;
        } else if (discount.type === 'percentage') {
          discountText = `${discount.params.percentage}% off`;
        } else if (discount.type === 'fixed') {
          discountText = `$${discount.params.amount?.toFixed(2)} off`;
          if (discount.params.withProduct) {
            const withProduct = state.products.find(p => p.id === discount.params.withProduct);
            if (withProduct) {
              discountText += ` with ${withProduct.name}`;
            }
          }
        }

        return (
          <div key={discount.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <div>
              <div className="font-medium">{discount.name}</div>
              <div className="text-sm text-gray-600">{productName}</div>
              <div className="text-sm font-semibold text-yellow-700">{discountText}</div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => setEditingDiscount(discount.id)}
              >
                <Edit size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  if (window.confirm(t('confirmDeleteDiscount'))) {
                    deleteDiscount(discount.id);
                  }
                }}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        );
      })}

      {editingDiscount && (
        <DiscountModal 
          isOpen={true} 
          onClose={() => setEditingDiscount(null)} 
          editingDiscountId={editingDiscount}
        />
      )}
    </div>
  );
};

export default DiscountList;
