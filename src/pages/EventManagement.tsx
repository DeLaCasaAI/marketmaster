
import React, { useState } from 'react';
import { useAppState } from '@/components/market-master/AppStateContext';
import { useLanguage } from '@/components/market-master/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar, PlusCircle, Edit, Trash2, ArrowLeft } from 'lucide-react';
import EventModal from '@/components/market-master/modals/EventModal';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const EventManagement = () => {
  const { state, deleteEvent, setCurrentEvent } = useAppState();
  const { t } = useLanguage();
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);

  const handleEditEvent = (eventId: number) => {
    setEditingEvent(eventId);
    setShowEventModal(true);
  };

  const handleCloseModal = () => {
    setEditingEvent(null);
    setShowEventModal(false);
  };

  const isActive = (event: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startDate = new Date(event.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(event.endDate);
    endDate.setHours(23, 59, 59, 999);
    
    return today >= startDate && today <= endDate;
  };

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return format(start, 'MMM d, yyyy');
    } else {
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/market-master">
              <Button variant="ghost" className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{t('eventsManagementTitle')}</h1>
          </div>
          <Button 
            onClick={() => {
              setEditingEvent(null);
              setShowEventModal(true);
            }}
            className="bg-green-600 hover:bg-green-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> {t('newEventButton')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.events.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-500">
              {t('noEventsMessage')}
            </div>
          ) : (
            state.events.map(event => (
              <Card key={event.id} className={`overflow-hidden ${isActive(event) ? 'border-green-500 border-2' : ''}`}>
                <CardHeader className="bg-gray-50 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="inline mr-2 text-purple-500" /> {event.name}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      {formatEventDate(event.startDate, event.endDate)}
                    </p>
                    <p className="text-sm">{event.location}</p>
                    <div className="flex justify-between mt-4">
                      <span className="text-sm font-medium">{t('eventCostLabel')}: ${event.cost.toFixed(2)}</span>
                      <Link to="/market-master">
                        <Button 
                          size="sm"
                          variant="outline" 
                          onClick={() => setCurrentEvent(event.id)}
                        >
                          {t('selectEventButton')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {/* Event Modal */}
      <EventModal 
        isOpen={showEventModal} 
        onClose={handleCloseModal}
        eventId={editingEvent} 
      />
    </div>
  );
};

export default EventManagement;
