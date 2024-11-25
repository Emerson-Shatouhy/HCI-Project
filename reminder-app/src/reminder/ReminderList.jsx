import { ChevronRight, Plus, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

const ReminderList = ({ reminders = [], onAddNew = () => { }, onSelectReminder = () => { } }) => {
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReminders = reminders.filter(reminder =>
        reminder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reminder.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCheckboxClick = (e, reminder) => {
        e.stopPropagation();
        const newCheckedItems = new Set(checkedItems);
        if (checkedItems.has(reminder.id)) {
            newCheckedItems.delete(reminder.id);
        } else {
            newCheckedItems.add(reminder.id);
        }
        setCheckedItems(newCheckedItems);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center space-x-2 mb-4">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search reminders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Reminders</CardTitle>
                    <Button onClick={onAddNew} className="flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>New Reminder</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {filteredReminders.map((reminder) => (
                        <div
                            key={reminder.id}
                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => onSelectReminder(reminder)}
                        >
                            <div onClick={(e) => handleCheckboxClick(e, reminder)}>
                                <Checkbox
                                    className="mr-3"
                                    checked={checkedItems.has(reminder.id)}
                                />
                            </div>
                            <div className="flex-1">
                                <p className={`${checkedItems.has(reminder.id) ? 'line-through text-gray-400' : 'font-medium'}`}>
                                    {reminder.name}
                                </p>
                                <p className="text-sm text-gray-500">{reminder.date}</p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReminderList;