
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from 'lucide-react';
import { useAppState } from './AppStateContext';
import ProductModal from './modals/ProductModal';

interface ProductListProps {
  onAddToSale: (productId: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToSale }) => {
  const { state, deleteProduct } = useAppState();
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  if (state.products.length === 0) {
    return <div className="text-gray-500 italic">No products added yet</div>;
  }

  return (
    <div className="space-y-3">
      {state.products.map(product => (
        <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500">
              ${product.price.toFixed(2)} | Cost: ${product.cost.toFixed(2)}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setEditingProduct(product.id)}
            >
              <Edit size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this product?')) {
                  deleteProduct(product.id);
                }
              }}
            >
              <Trash2 size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-green-600 hover:text-green-800"
              onClick={() => onAddToSale(product.id)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      ))}

      {editingProduct && (
        <ProductModal 
          isOpen={true} 
          onClose={() => setEditingProduct(null)} 
          editingProductId={editingProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
