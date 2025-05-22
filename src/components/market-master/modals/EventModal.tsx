
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { useAppState } from '../AppStateContext';
import { useLanguage } from '../LanguageContext';
import EventForm, { FormValues } from './EventForm';
import { format } from 'date-fns';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId?: number | null;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, eventId }) => {
  const { state, createEvent, updateEvent } = useAppState();
  const { t } = useLanguage();
  
  // Find event data if editing an existing event
  const eventToEdit = eventId ? state.events.find(event => event.id === eventId) || null : null;
  
  const onSubmit = (values: FormValues) => {
    // Format dates to YYYY-MM-DD string format - this ensures consistent date handling
    const startDateStr = format(values.startDate, 'yyyy-MM-dd');
    const endDateStr = format(values.endDate, 'yyyy-MM-dd');
    
    const eventData = {
      name: values.name,
      startDate: startDateStr,
      endDate: endDateStr,
      location: values.location || "",
      cost: parseFloat(values.cost),
      startTime: new Date().toISOString()
    };

    if (eventId) {
      updateEvent(eventId, eventData);
    } else {
      createEvent(eventData);
    }
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {eventId ? t('editEventTitle') : t('newEventModalTitle')}
          </DialogTitle>
          <DialogDescription>
            {t('eventModalDescription')}
          </DialogDescription>
        </DialogHeader>

        <EventForm 
          eventId={eventId || null}
          eventData={eventToEdit}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
