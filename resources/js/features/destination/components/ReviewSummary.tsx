import { Star } from 'lucide-react';

import type { DestinationDetail } from '@/features/destination/types';

interface ReviewSummaryProps {
    destination: DestinationDetail;
}

export default function ReviewSummary({ destination }: ReviewSummaryProps) {
    return (
        <div className="rounded-xl border border-[var(--detail-surface-high)] bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold">Ulasan Pengunjung</h3>
            <div className="space-y-4">
                {destination.reviewMetrics.map((review, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{review.label}</span>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-[var(--detail-surface-high)]">
                                <div className="h-full bg-[var(--detail-primary)]" style={{ width: review.width }} />
                            </div>
                            <span className="text-xs font-bold">{review.score}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 border-t border-[var(--detail-surface-high)] pt-8">
                <div className="flex gap-4">
                    <img
                        alt={`Avatar ${destination.featuredReview.name}`}
                        className="h-12 w-12 rounded-full object-cover"
                        src={destination.featuredReview.avatar}
                        referrerPolicy="no-referrer"
                    />
                    <div>
                        <h5 className="text-sm font-bold">{destination.featuredReview.name}</h5>
                        <p className="mb-1 text-xs italic text-[var(--detail-on-surface-variant)]">"{destination.featuredReview.quote}"</p>
                        <div className="flex text-yellow-500">
                            {[...Array(destination.featuredReview.rating)].map((_, index) => (
                                <Star key={index} size={12} fill="currentColor" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
