import type { HomeDestinationCategory } from '@/features/home/types';

export interface RecommendationHeroContent {
    monthLabel: string;
    categoryLabel: string;
    title: string;
    description: string;
    insightLabel: string;
    insightText: string;
    image: string;
    imageAlt: string;
}

export interface RecommendationDestination {
    id: string;
    name: string;
    filterCategory: Exclude<HomeDestinationCategory, 'all'>;
    category: string;
    categoryIcon: 'eco' | 'local_florist' | 'nutrition';
    status: 'PEAK' | 'AVAILABLE' | 'OFF-SEASON';
    price: string;
    priceValue: number;
    hours: string;
    specialty: string;
    image: string;
    mapHref: string;
    detailHref: string;
    landmarks: string[];
    seasonMonths: number[];
}

export interface RecommendationInsightMetric {
    label: string;
    value: string;
    status: number | string;
}

export interface RecommendationInsight {
    rainfall: RecommendationInsightMetric;
    temperature: RecommendationInsightMetric;
    humidity: RecommendationInsightMetric;
    harvestIntensity: number;
    bloomIntensity: number;
    landCondition: string;
}

export interface NearbyInsight {
    title: string;
    description: string;
    countLabel: string;
    image: string;
    imageAlt: string;
    href: string;
}

export interface LandmarkOption {
    id: string;
    name: string;
}
