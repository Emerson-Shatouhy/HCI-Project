import { useState } from 'react';
import { Share2, MapPin, ArrowLeft, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

// Main App Component
const ReminderApp = () => {
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

// Reminder List Component
const ReminderList = ({ reminders = [], onAddNew = () => { }, onSelectReminder = () => { } }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Reminders</CardTitle>
        <Button variant="ghost" size="icon" onClick={onAddNew}>
          <Plus className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              onClick={() => onSelectReminder(reminder)}
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Checkbox className="mr-3" />
              <span>{reminder.name} - {reminder.date}</span>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Reminder Detail Component
const ReminderDetail = ({ reminder = null, onBack = () => { }, onShare = () => { }, onSave = () => { } }) => {
  const [name, setName] = useState(reminder?.name || '');
  const [date, setDate] = useState(reminder?.date || '');
  const [description, setDescription] = useState(reminder?.description || '');
  const [radius, setRadius] = useState(50);

  const handleSave = () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
    onSave({ name, date, description, radius });
  };

  return (
    <Card>
      <CardHeader className="bg-gray-100 space-y-0 pb-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <MapPin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Reminder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Radius</label>
          <Slider
            value={[radius]}
            onValueChange={(value) => setRadius(value[0])}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-24"
        />

        <Button
          className="w-full"
          onClick={handleSave}
        >
          Confirm
        </Button>
      </CardContent>
    </Card>
  );
};

// Sharing View Component
const SharingView = ({ onBack = () => { } }) => {
  const [people] = useState([
    { id: 1, name: 'John Doe', shared: false },
    { id: 2, name: 'Jane Smith', shared: true },
    { id: 3, name: 'Mike Johnson', shared: true },
    { id: 4, name: 'Sarah Williams', shared: false },
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <CardTitle>Share</CardTitle>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        {people.map((person) => (
          <div key={person.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
              <span>{person.name}</span>
            </div>
            <Switch
              checked={person.shared}
              onCheckedChange={() => { }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReminderApp;