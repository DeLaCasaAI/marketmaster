
import React from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-1 bg-white text-green-800 border-white hover:bg-green-100 hover:text-green-800" 
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'Español' : 'English'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
