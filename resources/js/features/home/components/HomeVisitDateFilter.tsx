import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { format } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface HomeVisitDateFilterProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date | null) => void;
}

export default function HomeVisitDateFilter({ selectedDate, onSelectDate }: HomeVisitDateFilterProps) {
    return (
        <Popover className="relative w-full">
            {({ open, close }) => (
                <>
                    <PopoverButton className="relative w-full rounded-full bg-stone-100/60 py-4 pr-10 pl-12 text-left text-[var(--app-text)] outline-none transition focus-visible:ring-2 focus-visible:ring-[color:rgba(19,82,39,0.16)]">
                        <CalendarDays className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                        <span className="block truncate text-[var(--app-text)]">
                            {selectedDate ? format(selectedDate, 'dd MMM yyyy', { locale: indonesianLocale }) : 'Tanggal berkunjung'}
                        </span>
                        <ChevronDown
                            className={`pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)] transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                    </PopoverButton>

                    {open ? (
                        <PopoverPanel
                            static
                            as={motion.div}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ambient-bloom absolute top-full left-0 z-100 mt-4 w-max min-w-full max-w-[calc(100vw-3rem)] overflow-hidden rounded-[1.75rem] border border-[color:rgba(19,82,39,0.12)] bg-white p-5"
                        >
                            <DayPicker
                                mode="single"
                                locale={indonesianLocale}
                                selected={selectedDate ?? undefined}
                                defaultMonth={selectedDate ?? new Date()}
                                showOutsideDays
                                onSelect={(date) => {
                                    onSelectDate(date ?? null);
                                    if (date) {
                                        close();
                                    }
                                }}
                                className="home-day-picker"
                            />
                        </PopoverPanel>
                    ) : null}
                </>
            )}
        </Popover>
    );
}
