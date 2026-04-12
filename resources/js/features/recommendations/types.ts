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
    type: string;
    description: string;
    price: string;
    hours: string;
    commodity: string;
    image: string;
    mapHref: string;
    detailHref: string;
    isHighlyRecommended?: boolean;
    isGreatSeasonalChoice?: boolean;
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
