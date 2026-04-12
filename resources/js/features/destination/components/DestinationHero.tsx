import { MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function DestinationHero() {
    return (
        <header className="relative h-[60vh] w-full overflow-hidden md:h-[75vh]">
            <img
                alt="Lush green apple orchard in Batu"
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLl82jgV7a3CXzhT3qDXzL7MV2bBR7srEIlFQ1qtw4dWaD9D9BT55Z25G5iZATZAd619h4LimqTAVmyOe9W19iOHZ1uF9o3MI4IFyqWyBXHQIwZsRqgVwU-Fn00NYux37SatYtCL9kTDNfanpdSI5_Gh5jege8F99uCK-7DMiT7P5iVsJuFP4mJHm9slGbJNrzxsFaIFb2_8VUan9xLLZ0VYRWocRuKqbB1xwgpOcHvOblCijP878HK84inxZb2rHhCef9zsQLRfVQ"
                referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 mx-auto w-full max-w-7xl p-8 md:p-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4 flex flex-wrap gap-3"
                >
                    <span className="flex items-center gap-2 rounded-full bg-[var(--detail-primary-container)] px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[var(--detail-on-primary-container)] uppercase">
                        <Star size={14} fill="currentColor" /> Peak Season
                    </span>
                    <span className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md">
                        Agrotourism
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-4 text-4xl font-extrabold leading-tight text-white md:text-6xl"
                >
                    Kusuma Agro Wisata
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-6"
                >
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin size={18} className="text-[var(--detail-tertiary-fixed)]" />
                        <span className="font-medium">Batu, Jawa Timur</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                        <Star size={18} className="text-yellow-400" fill="currentColor" />
                        <span className="font-bold">4.8</span>
                        <span className="text-white/60">(2.4k reviews)</span>
                    </div>
                </motion.div>
            </div>
        </header>
    );
}
