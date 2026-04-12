import {
    ArrowLeft,
    Bell,
    Calendar,
    Heart,
    Home,
    Info,
    Map as MapIcon,
    Ticket,
    Trees,
    User,
} from 'lucide-react';
import { motion } from 'motion/react';

import DestinationHero from '@/features/destination/components/DestinationHero';
import DestinationInfo from '@/features/destination/components/DestinationInfo';
import FacilityList from '@/features/destination/components/FacilityList';
import LocationCard from '@/features/destination/components/LocationCard';
import ReviewSummary from '@/features/destination/components/ReviewSummary';
import SeasonalConditionPanel from '@/features/destination/components/SeasonalConditionPanel';

const mobileItems = [
    { icon: Home, label: 'Home' },
    { icon: Trees, label: 'Suggest', active: true },
    { icon: MapIcon, label: 'Map' },
    { icon: Calendar, label: 'Events' },
    { icon: Info, label: 'About' },
];

const Nav = () => (
    <nav className="fixed top-0 z-50 w-full bg-[color:rgba(250,249,244,0.8)] backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--detail-surface-lowest)] text-[var(--detail-primary)] shadow-sm transition-all hover:bg-[var(--detail-primary-fixed)]">
                    <ArrowLeft size={20} />
                </button>
                <span className="text-2xl font-bold tracking-tight text-[var(--detail-primary)]">AgroVisit Batu</span>
            </div>
            <div className="flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--detail-surface-lowest)] text-[var(--detail-on-surface)] shadow-sm transition-all hover:bg-[var(--detail-surface-high)]">
                    <Bell size={20} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--detail-surface-lowest)] text-[var(--detail-on-surface)] shadow-sm transition-all hover:bg-[var(--detail-surface-high)]">
                    <User size={20} />
                </button>
            </div>
        </div>
    </nav>
);

const BottomBar = () => (
    <div className="ambient-bloom fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white/80 p-6 backdrop-blur-2xl md:p-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <div className="hidden md:block">
                <div className="text-sm font-medium text-[var(--detail-on-surface-variant)]">Harga Tiket</div>
                <div className="text-2xl font-extrabold text-[var(--detail-primary)]">
                    Rp 80.000 <span className="text-sm font-normal text-[var(--detail-on-surface-variant)]">/ orang</span>
                </div>
            </div>
            <div className="flex flex-1 gap-4">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--detail-surface-high)] px-6 py-4 font-bold text-[var(--detail-on-surface)] transition-all hover:bg-[var(--detail-surface-highest)]">
                    <Heart size={20} /> Simpan
                </button>
                <button className="chlorophyll-gradient flex flex-[2] items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02]">
                    <Ticket size={20} /> Pesan Tiket Sekarang
                </button>
            </div>
        </div>
    </div>
);

const MobileNav = () => (
    <nav className="ambient-bloom fixed bottom-0 left-0 z-[60] flex w-full items-center justify-around rounded-t-[3rem] bg-white/80 px-4 pt-3 pb-6 backdrop-blur-2xl md:hidden">
        {mobileItems.map((item, index) => (
            <div
                key={index}
                className={`flex flex-col items-center justify-center p-2 transition-all ${item.active ? 'min-w-[64px] rounded-full bg-[var(--detail-primary)] text-white' : 'text-stone-500'}`}
            >
                <item.icon size={20} />
                <span className="mt-1 text-[10px] font-bold tracking-[0.2em] uppercase">{item.label}</span>
            </div>
        ))}
    </nav>
);

export default function DestinationDetailPage() {
    return (
        <div className="destination-detail-experience min-h-screen pb-32">
            <Nav />
            <DestinationHero />
            <main className="relative z-10 mx-auto mt-[-3rem] max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="space-y-8 lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <DestinationInfo />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <SeasonalConditionPanel />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <FacilityList />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-4"
                    >
                        <div className="space-y-8">
                            <LocationCard />
                            <ReviewSummary />
                        </div>
                    </motion.div>
                </div>
            </main>
            <BottomBar />
            <MobileNav />
        </div>
    );
}
