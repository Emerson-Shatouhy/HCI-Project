import { useState } from 'react';
import { Bell, MapPin, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import ReminderList from './reminder/ReminderList';
import ReminderDetail from './reminder/ReminderDetail';
import SharingView from './reminder/SharingView';

const App = () => {
  const [view, setView] = useState('list');
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: 'Team Meeting',
      date: '2024-06-15',
      category: 'Work',
      location: '123 Business Ave, Floor 4',
      validUntil: '8:00 PM'
    },
    {
      id: 2,
      name: 'Dentist Appointment',
      date: '2024-06-20',
      category: 'Health',
      location: 'Smile Dental Clinic, Suite 200',
      validUntil: '3:30 PM'
    },
    {
      id: 3,
      name: 'Birthday Party',
      date: '2024-06-25',
      category: 'Personal',
      location: 'Central Park',
      validUntil: '10:00 PM'
    },
  ]);

  const handleAddReminder = (reminder) => {
    setReminders([...reminders, { ...reminder, id: reminders.length + 1 }]);
    setView('list');
  };

  const handleTestNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filteredReminders = reminders.filter(reminder =>
    reminder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-full bg-gray-100 p-4">
      <div className="mx-auto max-w-md space-y-4">
        <AlertDialog open={showNotification} onOpenChange={setShowNotification}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <div className="flex items-center justify-between">
                <AlertDialogTitle className="text-xl font-bold">Team Meeting</AlertDialogTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Work</Badge>
              </div>
              <AlertDialogDescription className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <Bell className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">Reminder active</p>
                    <p className="text-sm text-gray-500">Will notify when near location</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">123 Business Ave</p>
                    <p className="text-sm text-gray-500">Floor 4, Conference Room</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-700">Active until</p>
                    <p className="text-sm text-gray-500">Today, 8:00 PM</p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        {view === 'list' && (
          <>
            <ReminderList
              reminders={filteredReminders}
              onAddNew={() => setView('detail')}
              onSelectReminder={(reminder) => {
                setSelectedReminder(reminder);
                setView('detail');
              }}
            />
            <Button
              className="w-full"
              variant="outline"
              onClick={handleTestNotification}
            >
              <Bell className="h-4 w-4 mr-2" />
              Send Test Notification
            </Button>
          </>
        )}
        {view === 'detail' && (
          <ReminderDetail
            reminder={selectedReminder}
            onBack={() => setView('list')}
            onShare={() => setView('share')}
            onSave={handleAddReminder}
          />
        )}
        {view === 'share' && (
          <SharingView
            onBack={() => setView('detail')}
          />
        )}
      </div>
    </div>
  );
};

export default App;