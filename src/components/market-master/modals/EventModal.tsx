
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppState } from '../AppStateContext';
import { useLanguage } from '../LanguageContext';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId?: number | null;
}

const formSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  location: z.string().optional(),
  cost: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Cost must be a positive number" }
  )
});

type FormValues = z.infer<typeof formSchema>;

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, eventId }) => {
  const { state, createEvent, updateEvent } = useAppState();
  const { t } = useLanguage();
  
  const today = new Date().toISOString().split('T')[0];
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      startDate: today,
      endDate: today,
      location: "",
      cost: "0"
    }
  });

  // Load event data when editing
  useEffect(() => {
    if (eventId) {
      const eventToEdit = state.events.find(event => event.id === eventId);
      if (eventToEdit) {
        form.reset({
          name: eventToEdit.name,
          startDate: eventToEdit.startDate,
          endDate: eventToEdit.endDate,
          location: eventToEdit.location || "",
          cost: eventToEdit.cost.toString()
        });
      }
    } else {
      form.reset({
        name: "",
        startDate: today,
        endDate: today,
        location: "",
        cost: "0"
      });
    }
  }, [eventId, form, today, state.events]);

  const onSubmit = (values: FormValues) => {
    const eventData = {
      name: values.name,
      startDate: values.startDate,
      endDate: values.endDate,
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
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('eventNameLabel')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('eventStartDateLabel')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('eventEndDateLabel')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('eventLocationLabel')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('eventCostLabel')} ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="1000" min="0" />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                {t('cancelButton')}
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {eventId ? t('updateEventButton') : t('startEventButton')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
