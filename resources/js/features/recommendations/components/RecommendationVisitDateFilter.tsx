import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { id as indonesianLocale } from 'date-fns/locale';
import { motion } from 'motion/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface RecommendationVisitDateFilterProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date | null) => void;
}

export default function RecommendationVisitDateFilter({
    selectedDate,
    onSelectDate,
}: RecommendationVisitDateFilterProps) {
    return (
        <Popover className="relative">
            {({ open, close }) => (
                <>
                    <PopoverButton className=" flex items-center gap-3 rounded-[1.75rem]  p-2 text-left transition">
                        <div className="flex min-h-[48px] flex-1 items-center gap-4 rounded-full border border-[var(--rec-outline-variant)]/24 bg-[var(--rec-surface-lowest)] px-5 py-3">
                            <CalendarDays className="h-5 w-5 shrink-0 text-[var(--rec-primary)]" />
                            <div className="min-w-0">
                                <p className="mt-1 truncate text-s font-semibold text-[var(--rec-on-surface)]">
                                    {selectedDate
                                        ? format(selectedDate, 'dd MMM yyyy', { locale: indonesianLocale })
                                        : 'Pilih tanggal kunjungan'}
                                </p>
                            </div>
                        <ChevronDown className={`mr-2 h-5 w-5 shrink-0 text-[var(--rec-primary)] transition-transform ${open ? 'rotate-180' : ''}`} />
                        </div>

                    </PopoverButton>

                    {open ? (
                        <PopoverPanel
                            static
                            as={motion.div}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ambient-bloom absolute top-full right-0 left-0 z-30 mt-4 overflow-hidden rounded-[1.75rem] border border-[var(--rec-outline-variant)]/20 bg-white p-5"
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
                                className="recommendation-day-picker"
                            />
                        </PopoverPanel>
                    ) : null}
                </>
            )}
        </Popover>
    );
}
