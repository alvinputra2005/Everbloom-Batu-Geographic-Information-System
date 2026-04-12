import { Map as MapIcon, MapPin, Navigation } from 'lucide-react';

export default function LocationCard() {
    return (
        <div className="overflow-hidden rounded-xl border border-[var(--detail-surface-high)] bg-[var(--detail-surface-lowest)] p-6 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <MapIcon className="text-[var(--detail-tertiary)]" size={20} /> Lokasi Presisi
            </h3>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-[var(--detail-surface-highest)]">
                <img
                    alt="Map of Batu area"
                    className="h-full w-full object-cover opacity-60 grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbFijUZIYovifvURwZX7hKRui6wPLDzrif1-EpIupJ8F4_qXKl2a27sfuaV3suyulOk6MMVUpJL0uUmM58y1AgJ8eZyT1ZPy-b8hu4t-NgRetXnJBXIBs15FJQFLU3ls6ASRqvEYs-ENrdmygJDqxI4UubdnLeET2oiYc2JiBu3BcaYPUbtVGJ4JUiNAvZbnlAInCejCnZ0enEk-4bhQ9aXHj5i0lM420-vgmoYSDTQOTki9Q0Mm4dAq7O7C7M-cmkjno7FS1xWeTI"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-[var(--detail-primary)] p-3 text-white shadow-lg">
                        <MapPin size={24} fill="currentColor" />
                    </div>
                </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--detail-on-surface-variant)]">
                Jl. Abdul Gani Atas, PO Box 36, Ngaglik, Kec. Batu, Kota Batu, Jawa Timur 65311
            </p>
            <div className="mt-6 flex gap-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[var(--detail-primary)] bg-white px-4 py-3 font-bold text-[var(--detail-primary)] transition-colors hover:bg-[var(--detail-primary-fixed)]">
                    <MapIcon size={16} /> View Map
                </button>
                <button className="chlorophyll-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white shadow-md transition-all hover:scale-[1.02]">
                    <Navigation size={16} /> Navigate
                </button>
            </div>
        </div>
    );
}
