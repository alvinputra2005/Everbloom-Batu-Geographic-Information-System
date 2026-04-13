import { Link } from '@inertiajs/react';

export default function SeasonalSpotlightCard() {
    return (
        <Link
            href="/calendar"
            className="inline-flex rounded-full bg-[var(--app-primary)] px-8 py-4 font-bold whitespace-nowrap text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:bg-[var(--app-primary-strong)]"
        >
            Lihat Kalender
        </Link>
    );
}
