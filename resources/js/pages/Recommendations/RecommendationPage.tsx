import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import DestinationCard from '@/components/common/DestinationCard';
import { destinationFilters, getDestinationsByCategory } from '@/features/home/data';
import MainLayout from '@/layouts/MainLayout';

interface RecommendationPageProps {
    initialCategory?: 'all' | 'buah' | 'bunga';
}

export default function RecommendationPage({ initialCategory = 'all' }: RecommendationPageProps) {
    const filteredDestinations = getDestinationsByCategory(initialCategory);

    return (
        <MainLayout>
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Link
                            href="/"
                            className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:rgba(19,82,39,0.08)] px-4 py-2 text-sm font-semibold text-[var(--app-primary)] transition hover:bg-[color:rgba(19,82,39,0.14)]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke beranda
                        </Link>
                        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Semua Destinasi Agrowisata</h1>
                        <p className="mt-4 max-w-2xl text-lg text-[var(--app-text-muted)]">
                            Jelajahi seluruh pilihan wisata buah dan wisata bunga di Batu, lalu buka detail destinasi yang paling sesuai dengan
                            rencana kunjunganmu.
                        </p>
                    </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-3">
                    {destinationFilters.map((filter) => (
                        <Link
                            key={filter.key}
                            href={`/destinations${filter.key === 'all' ? '' : `?category=${filter.key}`}`}
                            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                                initialCategory === filter.key
                                    ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white shadow-lg shadow-[color:rgba(19,82,39,0.15)]'
                                    : 'border-stone-200 bg-white text-[var(--app-text-muted)] hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]'
                            }`}
                        >
                            {filter.label}
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredDestinations.map((destination) => (
                        <DestinationCard key={destination.slug} destination={destination} />
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
