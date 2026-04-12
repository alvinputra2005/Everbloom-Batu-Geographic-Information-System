import { Link } from '@inertiajs/react';
import { Check, MapPin, Minus, Star } from 'lucide-react';

import { cn } from '@/lib/utils';

interface DestinationCardProps {
    destination: {
        slug: string;
        image: string;
        title: string;
        location: string;
        tags: string;
        status: 'Peak Status' | 'Available' | 'Off-Season';
        time: string;
        description?: string;
    };
    className?: string;
}

export default function DestinationCard({ destination, className }: DestinationCardProps) {
    return (
        <Link
            href={`/destinations/${destination.slug}`}
            className={cn(
                'home-bloom-card group flex h-full overflow-hidden rounded-[2rem] border border-stone-100 bg-white shadow-[0_20px_50px_rgba(27,28,25,0.08)] transition duration-300 hover:-translate-y-2',
                className,
            )}
        >
            <article className="flex h-full w-full flex-col">
                <div className="relative h-52 overflow-hidden">
                    <img
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={destination.image}
                        alt={destination.title}
                    />
                    <div
                        className={cn(
                            'absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase',
                            destination.status === 'Peak Status' && 'bg-[var(--app-primary)] text-white',
                            destination.status === 'Available' && 'bg-[var(--app-chip)] text-[var(--app-primary)]',
                            destination.status === 'Off-Season' && 'bg-stone-200 text-stone-600',
                        )}
                    >
                        {destination.status === 'Peak Status' ? <Star className="h-3 w-3 fill-current" /> : null}
                        {destination.status === 'Available' ? <Check className="h-3 w-3" /> : null}
                        {destination.status === 'Off-Season' ? <Minus className="h-3 w-3" /> : null}
                        {destination.status}
                    </div>
                </div>

                <div className="flex min-h-[11.5rem] flex-1 flex-col p-6">
                    <h3 className="mb-2 text-[1.9rem] leading-tight font-bold text-[var(--app-text)]">{destination.title}</h3>
                    <p className="mb-4 flex items-center gap-1 text-sm text-[var(--app-text-muted)]">
                        <MapPin className="h-4 w-4 shrink-0" />
                        {destination.location}
                    </p>

                    {destination.description ? (
                        <p className="mb-5 text-sm leading-relaxed text-[var(--app-text-muted)]">{destination.description}</p>
                    ) : null}

                    <div className="mt-auto flex items-start justify-between gap-4">
                        <span className="text-sm leading-snug font-bold text-[var(--app-primary-strong)]">{destination.tags}</span>
                        <span className="text-sm text-[var(--app-text-muted)]">{destination.time}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
