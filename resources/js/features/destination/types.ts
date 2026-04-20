export interface DestinationCoordinates {
    lat: number;
    lng: number;
}

export interface DestinationStat {
    icon: 'ticket' | 'clock' | 'sprout' | 'users';
    label: string;
    value: string;
}

export interface DestinationFacility {
    icon: 'car' | 'utensils' | 'waves' | 'tent' | 'wifi';
    label: string;
}

export interface DestinationReviewMetric {
    label: string;
    score: number;
    width: string;
}

export interface DestinationFeaturedReview {
    name: string;
    quote: string;
    rating: number;
    avatar: string;
}

export interface DestinationPeakMonth {
    label: string;
    height: number;
    tone: 'primary' | 'secondary' | 'surface';
    active?: boolean;
}

export interface DestinationSeasonalContent {
    updatedAt: string;
    highlightLabel: string;
    weatherDescription: string;
    produceDescription: string;
    peakMonths: DestinationPeakMonth[];
}

export interface DestinationDetail {
    slug: string;
    title: string;
    image: string;
    imageAlt: string;
    location: string;
    locationLabel: string;
    categoryLabel: string;
    statusLabel: string;
    statusTone: 'peak' | 'available' | 'off-season';
    rating: string;
    reviewsLabel: string;
    ticketPrice: string;
    bookingLabel: string;
    description: string;
    stats: DestinationStat[];
    facilities: DestinationFacility[];
    address: string;
    mapImage: string;
    mapImageAlt: string;
    coordinates: DestinationCoordinates;
    mapHref: string;
    navigationHref: string;
    reviewMetrics: DestinationReviewMetric[];
    featuredReview: DestinationFeaturedReview;
    seasonal: DestinationSeasonalContent;
}
