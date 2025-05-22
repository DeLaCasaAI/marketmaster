
import React, { useState } from 'react';
import { Menu, Calendar, BarChart2, Download, Upload, Hammer } from 'lucide-react';
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';
import { Button } from "@/components/ui/button";
import LanguageSwitcher from './LanguageSwitcher';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

interface HeaderProps {
  onNewEvent: () => void;
  onShowSalesReport: () => void;
}

const HeaderSection: React.FC<HeaderProps> = ({ onNewEvent, onShowSalesReport }) => {
  const { state, updateStateFromImport } = useAppState();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleExportData = () => {
    // Create a download blob with the state data
    const dataStr = JSON.stringify({
      products: state.products,
      discounts: state.discounts,
      salesHistory: state.salesHistory,
      events: state.events
    });
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    // Create a temporary link and click it to download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'marketmaster_data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        if (event.target?.result) {
          const data = JSON.parse(event.target.result as string);
          updateStateFromImport(data);
          toast({
            title: t('dataImportedSuccessfully')
          });
        }
      } catch (error) {
        toast({
          title: t('errorImportingData') + error,
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
    e.target.value = ''; // Reset the file input
  };

  return (
    <header className="app-header">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white mr-2 p-1 hover:bg-gray-700"
            onClick={toggleMenu}
          >
            <Menu size={24} />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{t('headerTitle')}</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium hidden sm:inline-block">
            {t('todaysSalesLabel')} ${state.salesHistory 
              .filter(s => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const saleDate = new Date(s.timestamp);
                return saleDate >= today;
              })
              .reduce((sum, s) => sum + s.total, 0)
              .toFixed(2)}
          </span>
          <LanguageSwitcher />
        </div>
        
        {/* Dropdown Menu */}
        {menuOpen && (
          <div id="menuDropdown" className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50">
            <div className="py-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:bg-gray-100" 
                onClick={() => {
                  onNewEvent();
                  setMenuOpen(false);
                }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('newEventButton')}
              </Button>

              <Link to="/event-management">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 hover:bg-gray-100" 
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <Hammer className="mr-2 h-4 w-4" />
                  {t('eventsManagement')}
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onShowSalesReport();
                  setMenuOpen(false);
                }}
              >
                <BarChart2 className="mr-2 h-4 w-4" />
                {t('reportsMenu')}
              </Button>

              <hr className="my-1 border-gray-200" />

              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleExportData();
                  setMenuOpen(false);
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                {t('exportData')}
              </Button>

              <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                <span>{t('importData')}</span>
                <input 
                  type="file" 
                  accept=".json" 
                  className="hidden" 
                  onChange={(e) => {
                    handleImportData(e);
                    setMenuOpen(false);
                  }} 
                />
              </label>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSection;
