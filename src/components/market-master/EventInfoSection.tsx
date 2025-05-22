
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';

const EventInfoSection: React.FC = () => {
  const { state } = useAppState();
  const { t } = useLanguage();
  
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
                {new Date(state.currentEvent.startDate).toLocaleDateString()} - {new Date(state.currentEvent.endDate).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventInfoSection;
