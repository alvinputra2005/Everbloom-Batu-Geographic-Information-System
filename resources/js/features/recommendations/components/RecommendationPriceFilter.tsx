interface RecommendationPriceFilterProps {
    isOpen: boolean;
    minPriceValue: number;
    maxPriceValue: number;
    currentMinPrice: number;
    currentMaxPrice: number;
    onMinPriceChange: (value: number) => void;
    onMaxPriceChange: (value: number) => void;
}

function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`;
}

export default function RecommendationPriceFilter({
    isOpen,
    minPriceValue,
    maxPriceValue,
    currentMinPrice,
    currentMaxPrice,
    onMinPriceChange,
    onMaxPriceChange,
}: RecommendationPriceFilterProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="p-5 pt-0">
            <input
                type="range"
                className="mb-6 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[var(--rec-surface-highest)] accent-[var(--rec-primary-container)]"
                min={minPriceValue}
                max={maxPriceValue}
                step="1000"
                value={currentMaxPrice}
                onChange={(event) => onMaxPriceChange(Number(event.target.value))}
            />
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">Min HTM</label>
                    <div className="flex items-center rounded-lg border border-[var(--rec-outline-variant)]/30 bg-[var(--rec-surface-low)] px-3 py-2 text-xs font-medium">
                        <span className="mr-2 text-[var(--rec-on-surface-variant)]">Rp</span>
                        <input
                            type="number"
                            min={minPriceValue}
                            max={currentMaxPrice}
                            step="1000"
                            value={currentMinPrice}
                            onChange={(event) => onMinPriceChange(Number(event.target.value))}
                            className="w-full bg-transparent outline-none"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <label className="mb-1 block text-[10px] font-bold text-[var(--rec-on-surface-variant)] uppercase">Max HTM</label>
                    <div className="flex items-center rounded-lg border border-[var(--rec-outline-variant)]/30 bg-[var(--rec-surface-low)] px-3 py-2 text-xs font-medium">
                        <span className="mr-2 text-[var(--rec-on-surface-variant)]">Rp</span>
                        <input
                            type="number"
                            min={currentMinPrice}
                            max={maxPriceValue}
                            step="1000"
                            value={currentMaxPrice}
                            onChange={(event) => onMaxPriceChange(Number(event.target.value))}
                            className="w-full bg-transparent outline-none"
                        />
                    </div>
                </div>
            </div>
            <p className="mt-3 text-[11px] text-[var(--rec-on-surface-variant)]">
                Rentang aktif: {formatRupiah(currentMinPrice)} - {formatRupiah(currentMaxPrice)}
            </p>
        </div>
    );
}
