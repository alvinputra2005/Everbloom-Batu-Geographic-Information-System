import { Link } from '@inertiajs/react';
import { ArrowLeft, Clock3, MapPin, Tag } from 'lucide-react';

import { getDestinationBySlug } from '@/features/home/data';
import MainLayout from '@/layouts/MainLayout';

interface DestinationDetailPageProps {
    slug: string;
}

export default function DestinationDetailPage({ slug }: DestinationDetailPageProps) {
    const destination = getDestinationBySlug(slug);

    if (!destination) {
        return (
            <MainLayout>
                <section className="mx-auto max-w-4xl px-6 py-20 text-center">
                    <h1 className="text-4xl font-bold">Destinasi tidak ditemukan</h1>
                    <p className="mt-4 text-[var(--app-text-muted)]">Data destinasi yang kamu buka belum tersedia atau slug-nya tidak cocok.</p>
                    <Link
                        href="/destinations"
                        className="mt-8 inline-flex rounded-full bg-[var(--app-primary)] px-6 py-3 font-semibold text-white"
                    >
                        Kembali ke semua destinasi
                    </Link>
                </section>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <section className="mx-auto max-w-7xl px-6 py-16">
                <Link
                    href="/destinations"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--app-primary)] hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke semua destinasi
                </Link>

                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-[0_24px_60px_rgba(27,28,25,0.12)]">
                        <img src={destination.image} alt={destination.title} className="h-full min-h-[24rem] w-full object-cover" />
                    </div>

                    <div className="flex flex-col justify-center rounded-[2.5rem] bg-white p-8 shadow-[0_24px_60px_rgba(27,28,25,0.08)]">
                        <span className="mb-4 inline-flex w-fit rounded-full bg-[color:rgba(19,82,39,0.1)] px-4 py-2 text-sm font-semibold text-[var(--app-primary)]">
                            {destination.category === 'buah' ? 'Wisata Buah' : 'Wisata Bunga'}
                        </span>
                        <h1 className="text-4xl font-bold md:text-5xl">{destination.title}</h1>
                        <p className="mt-4 text-lg leading-relaxed text-[var(--app-text-muted)]">{destination.description}</p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
                                <MapPin className="h-5 w-5 text-[var(--app-primary)]" />
                                <span>{destination.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
                                <Tag className="h-5 w-5 text-[var(--app-primary)]" />
                                <span>{destination.tags}</span>
                            </div>
                            <div className="flex items-center gap-3 text-[var(--app-text-muted)]">
                                <Clock3 className="h-5 w-5 text-[var(--app-primary)]" />
                                <span>{destination.time}</span>
                            </div>
                        </div>

                        <div className="mt-8 rounded-[1.5rem] bg-[var(--app-surface-muted)] p-5">
                            <p className="text-sm font-semibold tracking-[0.2em] text-[var(--app-primary)] uppercase">Status kunjungan</p>
                            <p className="mt-2 text-lg font-bold">{destination.status}</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
