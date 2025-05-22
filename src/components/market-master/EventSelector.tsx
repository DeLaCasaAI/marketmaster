
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
    // Parse the date strings properly (assuming YYYY-MM-DD format)
    const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
    const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
    
    // JavaScript months are 0-indexed (0 = January, 11 = December)
    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);
    
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
