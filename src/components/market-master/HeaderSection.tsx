
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Download, Upload } from 'lucide-react';
import { useAppState } from './AppStateContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';
import { toast } from "sonner";

interface HeaderSectionProps {
  onNewEvent: () => void;
  onShowSalesReport: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onNewEvent, onShowSalesReport }) => {
  const { calculateTodaysSales } = useAppState();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Event listener for clicking outside the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const menuButton = document.getElementById('menuButton');
      const menuDropdown = document.getElementById('menuDropdown');
      
      if (menuOpen && 
          menuButton && 
          menuDropdown && 
          !menuButton.contains(event.target as Node) && 
          !menuDropdown.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleExportData = () => {
    const data = JSON.stringify({
      // Export data structure would be defined here
      // This is a placeholder for the actual implementation
    });
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marketmaster_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(t('dataImportedSuccessfully'));
    setMenuOpen(false);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result;
          if (typeof result === 'string') {
            // This would be handled in the AppStateContext
            // updateStateFromImport(JSON.parse(result));
            toast.success(t('dataImportedSuccessfully'));
          }
        } catch (error) {
          toast.error(t('errorImportingData') + error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
    setMenuOpen(false);
  };

  return (
    <header className="border-b p-4 sticky top-0 z-10 bg-background">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">MarketMaster by DeLaCasa</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <span className="text-gray-500">{t('todaysSalesLabel')}</span>
            <span className="font-bold text-green-600 ml-2">${calculateTodaysSales().toFixed(2)}</span>
          </div>
          <div className="relative">
            <Button 
              id="menuButton"
              onClick={() => setMenuOpen(!menuOpen)} 
              className="bg-green-600 hover:bg-green-700"
            >
              <span className="mr-2">{t('reportsMenu')}</span>
            </Button>
            
            {menuOpen && (
              <div id="menuDropdown" className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <button 
                    onClick={() => { onNewEvent(); setMenuOpen(false); }}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                  >
                    <Plus className="inline mr-2 h-4 w-4" /> {t('newEventButton')}
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button 
                    onClick={() => { onShowSalesReport(); setMenuOpen(false); }}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                  >
                    <BarChart3 className="inline mr-2 h-4 w-4" /> {t('todaysSaleReport')}
                  </button>
                  <button 
                    onClick={handleExportData}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                  >
                    <Download className="inline mr-2 h-4 w-4" /> {t('exportData')}
                  </button>
                  <button 
                    onClick={handleImportData}
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-green-600 w-full text-left"
                  >
                    <Upload className="inline mr-2 h-4 w-4" /> {t('importData')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
