
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import SalesHistory from './SalesHistory';

const SalesHistorySection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          <Calendar className="inline mr-2 text-purple-500" /> {t('salesHistoryTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SalesHistory />
      </CardContent>
    </Card>
  );
};

export default SalesHistorySection;
