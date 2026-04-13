import { ChevronDown, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

import HomeVisitDateFilter from '@/features/home/components/HomeVisitDateFilter';

interface HeroSectionProps {
    selectedDate: Date | null;
    onSelectDate: (date: Date | null) => void;
}

export default function HeroSection({ selectedDate, onSelectDate }: HeroSectionProps) {
    return (
        <section className="relative -mt-20 flex min-h-[85vh] items-center justify-center overflow-visible px-6 pt-20 sm:px-8">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(250,249,244,0)_0%,rgba(250,249,244,0.22)_55%,rgba(250,249,244,1)_100%)]" />
                <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwLhuMosBTipjZ3CDGaYP5ufns7vppRPml7D21vLlAG3GKY8JEcUP7ZMgGuSrqnaMRUiNic8XbvW5iwkWfcyjYlrWqRBljGeiZTYvMjqgcdaY9U2a8B6QGFcbr-rVbbjLfAzoISeCPvNwR1BEn7hY4zL9BOrnVK_Xb8BInUVlS9QYNy_7NHKL7XNc1uecmNIIKqCq1WfT8RSk646-ZgkkwGQfLoqmK6zFXMmonb9vGWFC0pY4MemO0duWrb1-EacZXsmV8PtNzQjbY"
                    alt="Batu City Valley"
                    referrerPolicy="no-referrer"
                />
            </div>

            <div className="relative z-20 mx-auto max-w-4xl text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-14 text-5xl leading-[1.1] font-bold tracking-tight text-[var(--app-text)] md:text-6xl"
                >
                    Temukan waktu terbaik untuk mengunjungi destinasi <span className="text-[var(--app-primary)] italic">agrowisata</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.45 }}
                    className="ambient-bloom flex flex-col items-center gap-4 rounded-[2rem] bg-white/80 p-4 backdrop-blur-2xl md:flex-row md:p-2"
                >
                    <div className="relative w-full text-left md:flex-1">
                        <HomeVisitDateFilter selectedDate={selectedDate} onSelectDate={onSelectDate} />
                    </div>
                    <div className="relative w-full text-left md:flex-1">
                        <Leaf className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                        <select className="w-full cursor-pointer appearance-none rounded-full border-none bg-stone-100/60 py-4 pr-10 pl-12 text-[var(--app-text)] ring-0 outline-none focus:ring-2 focus:ring-[color:rgba(19,82,39,0.16)]">
                            <option>Kategori</option>
                            <option>Fruit Orchards</option>
                            <option>Flower Gardens</option>
                            <option>Vegetable Farms</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                    </div>
                    <button
                        type="button"
                        className="chlorophyll-gradient w-full rounded-[1.25rem] px-10 py-2 font-bold text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:translate-y-0.5 md:w-auto"
                    >
                        Dapatkan rekomendasi
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
