interface RecommendationPriceFilterProps {
    isOpen: boolean;
    maxPriceValue: number;
    currentPrice: number;
    onPriceChange: (value: number) => void;
    onReset: () => void;
}

function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export default function RecommendationPriceFilter({
    isOpen,
    maxPriceValue,
    currentPrice,
    onPriceChange,
    onReset,
}: RecommendationPriceFilterProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="p-5 pt-0">
            <div className="mb-4 flex justify-end">
                <button
                    type="button"
                    onClick={onReset}
                    className="text-[10px] font-bold tracking-[0.2em] text-[var(--rec-secondary)] uppercase"
                >
                    Reset
                </button>
            </div>
            <input
                type="range"
                className="mb-6 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[var(--rec-surface-highest)] accent-[var(--rec-primary-container)]"
                min="0"
                max={maxPriceValue}
                step="1000"
                value={currentPrice}
                onChange={(event) => onPriceChange(Number(event.target.value))}
            />
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">Min HTM</label>
                    <div className="rounded-lg border border-[var(--rec-outline-variant)]/30 bg-[var(--rec-surface-low)] px-3 py-2 text-xs font-medium">
                        Rp 0
                    </div>
                </div>
                <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">Max HTM</label>
                    <div className="rounded-lg border border-[var(--rec-outline-variant)]/30 bg-[var(--rec-surface-low)] px-3 py-2 text-xs font-medium">
                        {formatRupiah(currentPrice)}
                    </div>
                </div>
            </div>
        </div>
    );
}
