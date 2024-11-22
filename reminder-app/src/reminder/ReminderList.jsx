import { ChevronRight, Plus, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

const ReminderList = ({ reminders = [], onAddNew = () => { }, onSelectReminder = () => { } }) => {
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');

    const handleCheck = (e, id) => {
        e.stopPropagation();
        const newCheckedItems = new Set(checkedItems);
        if (checkedItems.has(id)) {
            newCheckedItems.delete(id);
        } else {
            newCheckedItems.add(id);
        }
        setCheckedItems(newCheckedItems);
    };

    const filteredReminders = reminders.filter(reminder =>
        reminder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reminder.date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">Reminders</CardTitle>
                <Button variant="ghost" size="icon" onClick={onAddNew}>
                    <Plus className="h-5 w-5" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Search reminders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                    />
                </div>
                <div className="space-y-2">
                    {filteredReminders.map((reminder) => (
                        <div
                            key={reminder.id}
                            onClick={() => onSelectReminder(reminder)}
                            className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                            <div onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                    className="mr-3"
                                    checked={checkedItems.has(reminder.id)}
                                    onCheckedChange={(checked) => {
                                        const newCheckedItems = new Set(checkedItems);
                                        if (checked) {
                                            newCheckedItems.add(reminder.id);
                                        } else {
                                            newCheckedItems.delete(reminder.id);
                                        }
                                        setCheckedItems(newCheckedItems);
                                    }}
                                />
                            </div>
                            <span className={`${checkedItems.has(reminder.id) ? 'line-through text-gray-400' : ''}`}>
                                {reminder.name} - {reminder.date}
                            </span>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReminderList;