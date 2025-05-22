
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLanguage } from '../LanguageContext';
import EventDatePicker from './EventDatePicker';
import { Event } from '../AppStateContext';
import { DialogFooter } from '@/components/ui/dialog';

interface EventFormProps {
  eventId: number | null;
  eventData: Event | null;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  location: z.string().optional(),
  cost: z.string().refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0,
    { message: "Cost must be a positive number" }
  )
});

export type FormValues = z.infer<typeof formSchema>;

const EventForm: React.FC<EventFormProps> = ({ 
  eventId, 
  eventData, 
  onSubmit, 
  onCancel 
}) => {
  const { t } = useLanguage();
  const today = new Date();
  
  // Initialize form with default or event data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: eventData?.name || "",
      startDate: eventData ? new Date(eventData.startDate) : today,
      endDate: eventData ? new Date(eventData.endDate) : today,
      location: eventData?.location || "",
      cost: eventData ? eventData.cost.toString() : "0"
    }
  });

  return (
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

        <EventDatePicker 
          form={form} 
          name="startDate" 
          label={t('eventStartDateLabel')} 
        />

        <EventDatePicker 
          form={form} 
          name="endDate" 
          label={t('eventEndDateLabel')} 
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
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('cancelButton')}
          </Button>
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            {eventId ? t('updateEventButton') : t('startEventButton')}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EventForm;
