
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';
import { format } from 'date-fns';

const EventInfoSection: React.FC = () => {
  const { state } = useAppState();
  const { t } = useLanguage();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    // Parse the date string properly (assuming YYYY-MM-DD format)
    const [year, month, day] = dateString.split('-').map(Number);
    // JavaScript months are 0-indexed (0 = January, 11 = December)
    const date = new Date(year, month - 1, day);
    return format(date, 'MMM d, yyyy');
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {state.currentEvent?.name || t('newEventButton')}
            </h2>
            <p className="text-gray-600">{state.currentEvent?.location || t('eventLocationLabel')}</p>
          </div>
          <div className="mt-2 md:mt-0">
            {state.currentEvent && (
              <p className="text-gray-600 font-medium">
                {formatDate(state.currentEvent.startDate)} - {formatDate(state.currentEvent.endDate)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventInfoSection;
