import { lazy, Suspense, useEffect, useState } from 'react';

const LiveLocationMapClient = lazy(() => import('./LiveLocationMapClient'));

function MapSkeleton() {
    return (
        <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-[0_18px_45px_rgba(27,28,25,0.08)]">
            <div className="flex h-[26rem] items-center justify-center bg-[linear-gradient(135deg,rgba(19,82,39,0.08)_0%,rgba(47,107,61,0.04)_100%)] px-6 text-center text-[var(--app-text-muted)]">
                Memuat peta lokasi...
            </div>
        </div>
    );
}

export default function LiveLocationMap() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <MapSkeleton />;
    }

    return (
        <Suspense fallback={<MapSkeleton />}>
            <LiveLocationMapClient />
        </Suspense>
    );
}
