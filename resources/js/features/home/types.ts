export type HomeDestinationCategory = 'all' | 'buah' | 'bunga';

export interface HomeDestination {
    slug: string;
    image: string;
    title: string;
    location: string;
    tags: string;
    status: 'Peak Status' | 'Available' | 'Off-Season';
    time: string;
    category: Exclude<HomeDestinationCategory, 'all'>;
    description?: string;
}

export interface HomeDestinationFilter {
    key: HomeDestinationCategory;
    label: string;
}
