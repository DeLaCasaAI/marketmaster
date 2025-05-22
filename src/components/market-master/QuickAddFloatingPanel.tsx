
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { Button } from "@/components/ui/button";
import QuickAddButtons from './QuickAddButtons';

interface QuickAddFloatingPanelProps {
  onAddToSale: (productId: number) => void;
  visible: boolean;
  onToggle: () => void;
}

const QuickAddFloatingPanel: React.FC<QuickAddFloatingPanelProps> = ({ 
  onAddToSale, 
  visible, 
  onToggle 
}) => {
  const { t } = useLanguage();
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 quick-add-floating ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-1 flex justify-center border-b border-gray-200">
        <Button 
          variant="ghost"
          size="sm"
          className="flex items-center text-gray-600 quick-add-toggle"
          onClick={onToggle}
        >
          {visible ? (
            <>
              <ArrowDown size={16} className="mr-1" />
              {t('quickAddTitle')}
            </>
          ) : (
            <>
              <ArrowUp size={16} className="mr-1" />
              {t('quickAddTitle')}
            </>
          )}
        </Button>
      </div>
      
      {visible && (
        <div className="p-4 max-h-60 overflow-y-auto quick-add-content">
          <QuickAddButtons onAddToSale={onAddToSale} />
        </div>
      )}
    </div>
  );
};

export default QuickAddFloatingPanel;
