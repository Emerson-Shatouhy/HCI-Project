import { useState } from 'react';
import { Share2, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ReminderDetail = ({ reminder = null, onBack = () => { }, onShare = () => { }, onSave = () => { } }) => {
    const [name, setName] = useState(reminder?.name || '');
    const [date, setDate] = useState(reminder?.date || '');
    const [description, setDescription] = useState(reminder?.description || '');
    const [radius, setRadius] = useState(50);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleSave = () => {
        if (!date) {
            alert('Please select a date');
            return;
        }
        setShowConfirmDialog(true);
    };

    const handleConfirm = () => {
        onSave({ name, date, description, radius });
        setShowConfirmDialog(false);
    };

    return (
        <>
            <Card>
                <CardHeader className="bg-gray-100 space-y-0 pb-4">
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" size="icon" onClick={onBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={onShare}>
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="relative w-full h-48 bg-slate-400">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-500 rounded-full bg-blue-500/20"
                            style={{
                                width: `${radius}%`,
                                height: `${radius}%`,
                                transition: 'all 0.2s ease-in-out'
                            }}
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <MapPin className="h-6 w-6 text-blue-500" />
                        </div>
                    </div>
                    <Input
                        placeholder="Reminder Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm text-gray-600">Radius</label>
                            <span className="text-sm text-gray-600">{radius}%</span>
                        </div>
                        <Slider
                            value={[radius]}
                            onValueChange={(value) => setRadius(value[0])}
                            max={100}
                            min={10}
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

            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Changes</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to save these changes to the reminder?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ReminderDetail;