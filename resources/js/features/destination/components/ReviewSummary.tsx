import { Star } from 'lucide-react';

const reviewStats = [
    { label: 'Kebersihan', score: 4.9, w: '95%' },
    { label: 'Pelayanan', score: 4.5, w: '85%' },
    { label: 'Fasilitas', score: 4.7, w: '90%' },
];

export default function ReviewSummary() {
    return (
        <div className="rounded-xl border border-[var(--detail-surface-high)] bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold">Ulasan Pengunjung</h3>
            <div className="space-y-4">
                {reviewStats.map((review, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{review.label}</span>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-32 overflow-hidden rounded-full bg-[var(--detail-surface-high)]">
                                <div className="h-full bg-[var(--detail-primary)]" style={{ width: review.w }} />
                            </div>
                            <span className="text-xs font-bold">{review.score}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 border-t border-[var(--detail-surface-high)] pt-8">
                <div className="flex gap-4">
                    <img
                        alt="User avatar"
                        className="h-12 w-12 rounded-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY0IWBG1GqDQQ9gtcMxFLm-xuz3nD3SKWVJpK_dzCRVVs5RVMrEtBy-tWysxEketbDlqCZMDHTA59t07H-kd_xU4wYZV0CgEEqDwfLxwfQcvfoafuZGg9Y2txr4mtRmagwZVU3_jsxiE1VQCIU_VfW68br6wkbyLGM8qc_86NxnlfmA7rjiSLDqyV-2Ml-vIvr5IMPw1oiSYskGmU25VRHSio_yWxiFELLd0f69n8-2yiGwU8mudpInN8Cq806ZWtZaHr_CGoGUszN"
                        referrerPolicy="no-referrer"
                    />
                    <div>
                        <h5 className="text-sm font-bold">Budi Santoso</h5>
                        <p className="mb-1 text-xs italic text-[var(--detail-on-surface-variant)]">
                            "Apelnya sangat manis dan segar. Udara di kebun sangat menyegarkan!"
                        </p>
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, index) => (
                                <Star key={index} size={12} fill="currentColor" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
