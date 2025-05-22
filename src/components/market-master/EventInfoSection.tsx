
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';
import { format, parse } from 'date-fns';

const EventInfoSection: React.FC = () => {
  const { state } = useAppState();
  const { t } = useLanguage();
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    
    try {
      // Parse the date string properly from YYYY-MM-DD format
      const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
      return format(parsedDate, 'MMM d, yyyy');
    } catch (error) {
      console.error('Error parsing date:', error);
      return dateString; // Fallback to original string if parsing fails
    }
  };
  
  console.log('Current event in EventInfoSection:', state.currentEvent);
  
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
