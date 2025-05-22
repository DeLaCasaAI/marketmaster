
import React from 'react';
import { useAppState } from './AppStateContext';
import { useLanguage } from './LanguageContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from 'date-fns';

interface EventSelectorProps {
  onEventChange: (eventId: number | null) => void;
  value: number | null;
  showAllOption?: boolean;
}

const EventSelector: React.FC<EventSelectorProps> = ({ 
  onEventChange,
  value,
  showAllOption = true
}) => {
  const { state } = useAppState();
  const { t } = useLanguage();

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return format(start, 'MMM d, yyyy');
    } else {
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    }
  };

  const handleChange = (eventId: string) => {
    if (eventId === "all") {
      onEventChange(null);
    } else {
      onEventChange(parseInt(eventId));
    }
  };

  const currentValue = value === null ? "all" : value.toString();

  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={t('selectEventPlaceholder')} />
      </SelectTrigger>
      <SelectContent>
        {showAllOption && (
          <SelectItem value="all">{t('allEventsOption')}</SelectItem>
        )}
        {state.events.map(event => (
          <SelectItem key={event.id} value={event.id.toString()}>
            {event.name} - {formatEventDate(event.startDate, event.endDate)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventSelector;
