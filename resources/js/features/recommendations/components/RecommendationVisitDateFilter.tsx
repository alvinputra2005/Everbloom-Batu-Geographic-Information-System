import { ChevronLeft, ChevronRight } from 'lucide-react';

interface RecommendationVisitDateFilterProps {
    isOpen: boolean;
    selectedDate: number | null;
    onSelectDate: (date: number | null) => void;
}

const leadingDate = 30;
const firstWeekDates = [1, 2, 3, 4, 5, 6];
const secondWeekDates = [7, 8, 9, 10, 11, 12, 13];

export default function RecommendationVisitDateFilter({
    isOpen,
    selectedDate,
    onSelectDate,
}: RecommendationVisitDateFilterProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="p-5 pt-0">
            <div className="rounded-lg bg-[var(--rec-surface-low)] p-3">
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--rec-on-surface)] uppercase">July 2024</span>
                    <div className="flex gap-2">
                        <ChevronLeft className="h-4 w-4 cursor-pointer" />
                        <ChevronRight className="h-4 w-4 cursor-pointer" />
                    </div>
                </div>
                <div className="mb-3 flex justify-end">
                    <button
                        type="button"
                        onClick={() => onSelectDate(null)}
                        className="text-[10px] font-bold tracking-[0.2em] text-[var(--rec-secondary)] uppercase"
                    >
                        Reset
                    </button>
                </div>
                <div className="mb-1 grid grid-cols-7 gap-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                        <span key={day} className="text-[9px] font-bold text-[var(--rec-on-surface-variant)]">
                            {day}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    <span className="py-1.5 text-[11px] text-[var(--rec-on-surface-variant)]/40">{leadingDate}</span>
                    {firstWeekDates.map((date) => (
                        <button
                            key={date}
                            type="button"
                            onClick={() => onSelectDate(date)}
                            className={`rounded py-1.5 text-[11px] font-bold ${selectedDate === date ? 'bg-[var(--rec-secondary)] text-white' : 'hover:bg-white'}`}
                        >
                            {date}
                        </button>
                    ))}
                    {secondWeekDates.map((date) => (
                        <button
                            key={date}
                            type="button"
                            onClick={() => onSelectDate(date)}
                            className={`rounded py-1.5 text-[11px] font-bold ${selectedDate === date ? 'bg-[var(--rec-secondary)] text-white' : 'hover:bg-white'}`}
                        >
                            {date}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
