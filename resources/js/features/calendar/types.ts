export type CategoryKey = 'fruits' | 'flowers';
export type SeasonTone = 'available' | 'peak';

export interface SeasonRange {
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
    tone: SeasonTone;
}

export interface Commodity {
    name: string;
    category: CategoryKey;
    note: string;
    ranges: SeasonRange[];
}

export interface InsightMonth {
    id: number;
    label: string;
    shortLabel: string;
    title: string;
    description: string;
    rainfall: string;
    temperature: string;
    humidity: string;
    harvestIntensity: number;
    bloomIntensity: number;
}

export interface CalendarCell {
    key: string;
    day: number | null;
}
