import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

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

export default SharingView;