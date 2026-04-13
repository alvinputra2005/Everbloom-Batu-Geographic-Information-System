import type { CalendarCell, Commodity, SeasonRange, SeasonTone } from '@/features/calendar/types';

const CALENDAR_YEAR = 2026;

export const weekdayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export function getDaysInMonth(month: number, year = CALENDAR_YEAR) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year = CALENDAR_YEAR) {
    return new Date(year, month, 1).getDay();
}

function isWithinRange(month: number, day: number, range: SeasonRange) {
    if (month < range.startMonth || month > range.endMonth) {
        return false;
    }

    if (month === range.startMonth && day < range.startDay) {
        return false;
    }

    if (month === range.endMonth && day > range.endDay) {
        return false;
    }

    return true;
}

export function getToneForDay(month: number, day: number, ranges: SeasonRange[]): SeasonTone | null {
    if (ranges.some((range) => range.tone === 'peak' && isWithinRange(month, day, range))) {
        return 'peak';
    }

    if (ranges.some((range) => range.tone === 'available' && isWithinRange(month, day, range))) {
        return 'available';
    }

    return null;
}

export function buildCalendarCells(month: number, year = CALENDAR_YEAR): CalendarCell[] {
    const totalDays = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const leadingEmpty = Array.from({ length: firstDay }, (_, index) => ({ key: `empty-start-${index}`, day: null }));
    const days = Array.from({ length: totalDays }, (_, index) => ({
        key: `day-${index + 1}`,
        day: index + 1,
    }));
    const filledCount = leadingEmpty.length + days.length;
    const trailingCount = filledCount % 7 === 0 ? 0 : 7 - (filledCount % 7);
    const trailingEmpty = Array.from({ length: trailingCount }, (_, index) => ({ key: `empty-end-${index}`, day: null }));

    return [...leadingEmpty, ...days, ...trailingEmpty];
}

export function getCalendarSummary(insightLabel: string, commodity?: Commodity) {
    if (!commodity) {
        return `Kalender musim ${insightLabel}.`;
    }

    return commodity.category === 'fruits'
        ? `Kalender panen ${commodity.name.toLowerCase()} untuk ${insightLabel}.`
        : `Kalender mekar ${commodity.name.toLowerCase()} untuk ${insightLabel}.`;
}
