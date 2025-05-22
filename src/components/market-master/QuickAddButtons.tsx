
import React from 'react';
import { useAppState } from './AppStateContext';

interface QuickAddButtonsProps {
  onAddToSale: (productId: number) => void;
}

const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({ onAddToSale }) => {
  const { state } = useAppState();

  if (state.products.length === 0) {
    return <div className="text-gray-500 italic">No products available</div>;
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
      {state.products.map(product => (
        <button
          key={product.id}
          className="bg-gray-100 hover:bg-gray-200 p-2 rounded flex flex-col items-center transition-colors"
          onClick={() => onAddToSale(product.id)}
        >
          <span className="font-medium line-clamp-1">{product.name}</span>
          <span className="text-sm text-gray-600">${product.price.toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickAddButtons;
