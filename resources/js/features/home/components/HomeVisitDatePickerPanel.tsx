import { id as indonesianLocale } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface HomeVisitDatePickerPanelProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date | null) => void;
    onClose: () => void;
}

export default function HomeVisitDatePickerPanel({ selectedDate, onSelectDate, onClose }: HomeVisitDatePickerPanelProps) {
    return (
        <DayPicker
            mode="single"
            locale={indonesianLocale}
            selected={selectedDate ?? undefined}
            defaultMonth={selectedDate ?? new Date()}
            showOutsideDays
            onSelect={(date) => {
                onSelectDate(date ?? null);
                if (date) {
                    onClose();
                }
            }}
            className="home-day-picker"
        />
    );
}
