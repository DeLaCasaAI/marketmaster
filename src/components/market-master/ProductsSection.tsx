
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingBag, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from './LanguageContext';
import ProductList from './ProductList';

interface ProductsSectionProps {
  onAddToSale: (productId: number) => void;
  onAddProduct: () => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ 
  onAddToSale, 
  onAddProduct 
}) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            <ShoppingBag className="inline mr-2 text-green-600" /> {t('productsTitle')}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-green-600 hover:text-green-800 hover:bg-green-50"
            onClick={onAddProduct}
          >
            <Plus size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ProductList onAddToSale={onAddToSale} />
      </CardContent>
    </Card>
  );
};

export default ProductsSection;
