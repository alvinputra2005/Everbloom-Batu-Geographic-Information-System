import SectionContainer from '@/components/common/SectionContainer';
import NearbyMapCard from '@/features/recommendations/components/NearbyMapCard';
import RecommendationHero from '@/features/recommendations/components/RecommendationHero';
import RecommendationList from '@/features/recommendations/components/RecommendationList';
import SmartInsightBox from '@/features/recommendations/components/SmartInsightBox';
import type { NearbyInsight, RecommendationDestination, RecommendationHeroContent, RecommendationInsight } from '@/features/recommendations/types';
import MainLayout from '@/layouts/MainLayout';

const HERO_CONTENT: RecommendationHeroContent = {
    monthLabel: 'July 2024',
    categoryLabel: 'Fruits & Flowers',
    title: 'The Harvest Season is Here',
    description:
        "Juli is great for sunflowers and citrus harvest. The dry mountain air in Batu provides perfect clarity for scenic orchard strolls. Based on your preferences, we've curated the best spots for this month.",
    insightLabel: 'Insight',
    insightText: 'High bloom intensity detected in northern Batu slopes today. Perfect for photography.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
    imageAlt: 'Batu Orchard',
};

const RECOMMENDED_DESTINATIONS: RecommendationDestination[] = [
    {
        id: '1',
        name: 'Kebun Apal Bumiaji',
        type: 'Fruit & Harvest',
        description:
            'Peak harvest time for Manalagi apples. The soil humidity is optimal for picking.',
        price: 'Rp 25.000',
        hours: '08:00 - 17:00',
        commodity: 'Manalagi Apple',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYL8C7GZgt7_YFv2LND0HcLEQ4a-a-FS8LczSFtOBTYMDfymTs2f5fchtP473OFhtUaTJj53GUUHSZUYljHHS63W6WNlhCEwjzCGA8DU3B1iolIAzDU0d-Fu1knm9O6l1ItM7LWw96VmSr444O4IWFP2qUPv_jWnawWQMKf5IJe3d6fjBYcD4H79r5mRTTg6_oGY8YXwV33CXb7UtP7xuii-gCwgLcjKanA-_Y8vo5OVXV-e3rEviXS92R8fMUCCeSktw2gdZwRWh_',
        detailHref: '#',
        mapHref: '#map',
        isHighlyRecommended: true,
    },
    {
        id: '2',
        name: 'Pusat Bunga Sidomulyo',
        type: 'Flower Village',
        description:
            'Experience a complete floral ecosystem. July offers the best light for photography among the greenhouses.',
        price: 'Free Entry',
        hours: '07:00 - 18:00',
        commodity: 'Roses & Orchids',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNP3ODtQnx9VdfnZcEq-TWyn4LKqo0irgW4vrRwFB7MPjNSEzWWj2mDRL0j_0NMAGPRIrq4dRw4Qr3iOjwpjZH3r55RjQuJwxqJurlVemFxbQCfqblgEADnBCgOJ-p-0o7mA0DCRMbWqJDR-_SAkG3hnMosIpU4PITx-XnIQxVIdz2noxfyqWmL1Qv2RJbtRJ0jfJdBGKfM6lqJ3VPTmCynup9d_zi6HEL6RBR5gPGO9fXd-NCBU1k8NpGcbIjBukNSXfTEdxrM0V6',
        detailHref: '#',
        mapHref: '#map',
        isGreatSeasonalChoice: true,
    },
];

const MONTHLY_INSIGHT: RecommendationInsight = {
    rainfall: {
        label: 'Curah Hujan',
        value: 'Low (Dry Season)',
        status: 12,
    },
    temperature: {
        label: 'Suhu Rata-rata',
        value: '18°C - 24°C',
        status: 'Stable',
    },
    humidity: {
        label: 'Kelembapan',
        value: '65%',
        status: 'Optimal',
    },
    harvestIntensity: 85,
    bloomIntensity: 70,
    landCondition: 'Tanah dalam kondisi kering dan padat, sangat memudahkan akses kendaraan hingga area perkebunan paling dalam.',
};

const NEARBY_INSIGHT: NearbyInsight = {
    title: 'Explore Nearby',
    description: 'There are 12 more agro-destinations within a 5km radius from your current selection.',
    countLabel: '12 Nearby Spots',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz5jIy4_Pr-jbJIWOqS3_9I7eEqui0YaHjoB6BcWFtkpcSdvUWoIouDySB6prS1FqHrfNwUtDVyTtIxBGacwSC9FEgfNhGrfY2GOvLwTZ4dPCw-8BcqWOL65aLrqFVZcxal7HZfmPegeqqS7NeJ59qrLMtQIGFKAu13_ZFYBY0XJWjUkEHn5M4oUtpgyJsu02h1ei2Mnna1lztua92v70tCB4MjSvzcGMdtGy6MnJoEG-nV_68LuvojhHskn_2veo2U2aot4me4TVs',
    imageAlt: 'Batu Map',
    href: '#map',
};

export default function RecommendationResultPage() {
    return (
        <MainLayout>
            <SectionContainer className="recommendation-experience bg-[var(--rec-background)] pt-6 pb-16 md:pt-8">
                <RecommendationHero hero={HERO_CONTENT} />

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    <section id="recommendations" className="space-y-12 lg:col-span-8">
                        <RecommendationList destinations={RECOMMENDED_DESTINATIONS} />
                    </section>

                    <aside id="map" className="space-y-8 lg:col-span-4">
                        <div className="space-y-8 lg:sticky lg:top-28">
                            <SmartInsightBox insight={MONTHLY_INSIGHT} />
                            <NearbyMapCard nearby={NEARBY_INSIGHT} />
                        </div>
                    </aside>
                </div>
            </SectionContainer>
        </MainLayout>
    );
}
