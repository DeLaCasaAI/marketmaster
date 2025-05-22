
import React from 'react';
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useLanguage } from '../LanguageContext';
import { cn } from "@/lib/utils";
import { UseFormReturn } from 'react-hook-form';

interface DatePickerFieldProps {
  form: UseFormReturn<any>;
  name: string; 
  label: string;
}

const EventDatePicker: React.FC<DatePickerFieldProps> = ({ 
  form, 
  name,
  label
}) => {
  const { t } = useLanguage();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal flex justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? format(field.value, "PPP") : <span>{t('pickDatePlaceholder')}</span>}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default EventDatePicker;
