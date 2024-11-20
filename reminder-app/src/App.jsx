import { useState } from 'react';
import ReminderList from './reminder/ReminderList';
import ReminderDetail from './reminder/ReminderDetail';
import SharingView from './reminder/SharingView';

const App = () => {
  const [view, setView] = useState('list');
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Team Meeting', date: '2024-06-15', category: 'Work' },
    { id: 2, name: 'Dentist Appointment', date: '2024-06-20', category: 'Health' },
    { id: 3, name: 'Birthday Party', date: '2024-06-25', category: 'Personal' },
  ]);

  const handleAddReminder = (reminder) => {
    setReminders([...reminders, { ...reminder, id: reminders.length + 1 }]);
    setView('list');
  };

  return (
    <div className="h-screen w-full bg-gray-100 p-4">
      <div className="mx-auto max-w-md">
        {view === 'list' && (
          <ReminderList
            reminders={reminders}
            onAddNew={() => setView('detail')}
            onSelectReminder={(reminder) => {
              setSelectedReminder(reminder);
              setView('detail');
            }}
          />
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