import { Link } from '@inertiajs/react';
import { MapPinned } from 'lucide-react';

import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
    href?: string;
    label?: string;
    className?: string;
}

export default function FloatingActionButton({
    href = '#map',
    label = 'Buka peta lokasi',
    className,
}: FloatingActionButtonProps) {
    return (
        <Link
            href={href}
            aria-label={label}
            className={cn(
                'fixed bottom-24 right-8 z-40 hidden h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--app-primary)_0%,var(--app-primary-strong)_100%)] text-white shadow-2xl transition hover:scale-105 active:scale-95 md:flex',
                className,
            )}
        >
            <MapPinned className="h-7 w-7" />
        </Link>
    );
}
