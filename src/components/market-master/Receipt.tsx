
import React from 'react';
import { Minus, Plus, Tag } from 'lucide-react';
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';

const Receipt: React.FC = () => {
  const { state, updateProductQuantity } = useAppState();
  const { t } = useLanguage();

  if (state.currentSale.items.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 mb-6 min-h-40">
        <div className="text-center text-gray-500 italic py-8">
          {t('emptyReceiptMessage')}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6 min-h-40">
      <div className="space-y-2">
        {state.currentSale.items.map(item => {
          const discountApplied = item.discountApplied > 0;
          const originalPrice = item.price * item.quantity;
          const discountedPrice = originalPrice - item.discountApplied;
          
          return (
            <div key={item.productId} className="flex justify-between items-center py-2 receipt-item">
              <div className="flex items-center">
                <div className="font-medium">{item.name}</div>
                {discountApplied && (
                  <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full discount-badge flex items-center">
                    <Tag size={12} className="mr-1" />
                    {t('discountsLabel')} ${item.discountApplied.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button 
                    className="text-gray-500 hover:text-gray-700 rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => updateProductQuantity(item.productId, -1)}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button 
                    className="text-gray-500 hover:text-gray-700 rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => updateProductQuantity(item.productId, 1)}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-right min-w-20">
                  <div className="font-medium">${discountedPrice.toFixed(2)}</div>
                  {discountApplied && (
                    <div className="text-xs text-gray-500 line-through">${originalPrice.toFixed(2)}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-gray-200 mt-4 pt-4">
        <div className="flex justify-between font-semibold">
          <span>{t('subtotalLabel')}</span>
          <span>${state.currentSale.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>{t('discountsLabel')}</span>
          <span>-${state.currentSale.discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mt-2">
          <span>{t('totalLabel')}</span>
          <span>${state.currentSale.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
