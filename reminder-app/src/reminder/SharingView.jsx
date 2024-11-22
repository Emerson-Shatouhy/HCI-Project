import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const SharingView = ({ onBack = () => { } }) => {
    const [people, setPeople] = useState([
        { id: 1, name: 'John Doe', shared: false },
        { id: 2, name: 'Jane Smith', shared: true },
        { id: 3, name: 'Mike Johnson', shared: true },
        { id: 4, name: 'Sarah Williams', shared: false },
    ]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newPersonName, setNewPersonName] = useState('');

    const handleToggleShare = (id) => {
        setPeople(people.map(person =>
            person.id === id ? { ...person, shared: !person.shared } : person
        ));
    };

    const handleAddPerson = () => {
        if (newPersonName.trim()) {
            setPeople([
                ...people,
                {
                    id: Math.max(...people.map(p => p.id)) + 1,
                    name: newPersonName.trim(),
                    shared: false
                }
            ]);
            setNewPersonName('');
            setIsAddDialogOpen(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Button variant="ghost" size="icon" onClick={onBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <CardTitle>Share</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsAddDialogOpen(true)}
                    >
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
                                onCheckedChange={() => handleToggleShare(person.id)}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Person</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Enter name"
                        value={newPersonName}
                        onChange={(e) => setNewPersonName(e.target.value)}
                        className="mt-4"
                    />
                    <DialogFooter className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsAddDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddPerson}>Add</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SharingView;