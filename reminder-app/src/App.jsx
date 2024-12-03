import { useState } from 'react';
import { Bell, MapPin, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import ReminderList from './reminder/ReminderList';
import ReminderDetail from './reminder/ReminderDetail';
import SharingView from './reminder/SharingView';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


const VARIANTS = {
  classic: {
    container: "max-w-md bg-white",
    header: "space-y-2",
    title: "text-xl font-bold text-gray-900",
    badge: "bg-blue-100 text-blue-700",
    description: "space-y-4 pt-4",
    icon: "h-5 w-5 text-blue-600 mt-1",
    itemTitle: "font-medium text-gray-700",
    itemText: "text-sm text-gray-500"
  },
  minimal: {
    container: "max-w-sm bg-white",
    header: "space-y-1",
    title: "text-base font-medium text-gray-900",
    badge: "bg-gray-100 text-gray-700",
    description: "space-y-2 pt-2",
    icon: "h-4 w-4 text-gray-500",
    itemTitle: "text-sm font-medium text-gray-800",
    itemText: "text-xs text-gray-500"
  }
};


const App = () => {
  const [view, setView] = useState('list');
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [variant, setVariant] = useState('classic');
  const styles = VARIANTS[variant];
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
        <div className="space-y-4">
          <RadioGroup value={variant} onValueChange={setVariant} className="grid grid-cols-3 gap-4">
            {Object.keys(VARIANTS).map((v) => (
              <div key={v}>
                <RadioGroupItem value={v} id={v} className="peer sr-only" />
                <Label
                  htmlFor={v}
                  className="block text-center p-2 border rounded-lg peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:text-blue-600 cursor-pointer"
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <AlertDialog open={showNotification} onOpenChange={setShowNotification}>
            <AlertDialogContent className={styles.container}>
              <AlertDialogHeader className={styles.header}>
                <div className="flex items-center justify-between">
                  <AlertDialogTitle className={styles.title}>Team Meeting</AlertDialogTitle>
                  <Badge variant="secondary" className={styles.badge}>Work</Badge>
                </div>
                <AlertDialogDescription className={styles.description}>
                  <div className="flex items-start space-x-3">
                    <Bell className={styles.icon} />
                    <div>
                      <p className={styles.itemTitle}>Reminder active</p>
                      <p className={styles.itemText}>Will notify when near location</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className={styles.icon} />
                    <div>
                      <p className={styles.itemTitle}>123 Business Ave</p>
                      <p className={styles.itemText}>Floor 4, Conference Room</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className={styles.icon} />
                    <div>
                      <p className={styles.itemTitle}>Active until</p>
                      <p className={styles.itemText}>Today, 8:00 PM</p>
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
    </div>
  );
};

export default App;