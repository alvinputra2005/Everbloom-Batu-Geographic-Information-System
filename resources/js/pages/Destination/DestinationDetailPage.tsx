import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Bell, Calendar, Heart, Home, Info, Map as MapIcon, Ticket, Trees, User } from 'lucide-react';
import { motion } from 'motion/react';

import Footer from '@/components/common/Footer';
import DestinationHero from '@/features/destination/components/DestinationHero';
import DestinationInfo from '@/features/destination/components/DestinationInfo';
import FacilityList from '@/features/destination/components/FacilityList';
import LocationCard from '@/features/destination/components/LocationCard';
import ReviewSummary from '@/features/destination/components/ReviewSummary';
import SeasonalConditionPanel from '@/features/destination/components/SeasonalConditionPanel';
import type { DestinationDetail } from '@/features/destination/types';

const mobileItems = [
    { icon: Home, label: 'Beranda' },
    { icon: Trees, label: 'Destinasi', active: true },
    { icon: MapIcon, label: 'Peta' },
    { icon: Calendar, label: 'Kalender' },
    { icon: Info, label: 'Tentang' },
];

const Nav = () => (
    <nav className="fixed top-0 z-50 w-full bg-[color:rgba(250,249,244,0.8)] backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
                <Link
                    href="/destinations"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--detail-surface-lowest)] text-[var(--detail-primary)] shadow-sm transition-all hover:bg-[var(--detail-primary-fixed)]"
                >
                    <ArrowLeft size={20} />
                </Link>
                <span className="text-2xl font-bold tracking-tight text-[var(--detail-primary)]">Everbloom</span>
            </div>
            <div className="flex items-center gap-3">
                {/* <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--detail-surface-lowest)] text-[var(--detail-on-surface)] shadow-sm transition-all hover:bg-[var(--detail-surface-high)]">
                    <Bell size={20} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--detail-surface-lowest)] text-[var(--detail-on-surface)] shadow-sm transition-all hover:bg-[var(--detail-surface-high)]">
                    <User size={20} />
                </button> */}
            </div>
        </div>
    </nav>
);

interface BottomBarProps {
    bookingLabel: string;
}

const BottomBar = ({ bookingLabel }: BottomBarProps) => (
    <div className="ambient-bloom fixed bottom-0 left-0 z-50 w-full rounded-t-xl bg-white/80 p-6 backdrop-blur-2xl md:p-8">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4">
            <div className="flex w-full max-w-6xl gap-4">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--detail-surface-high)] px-6 py-4 font-bold text-[var(--detail-on-surface)] transition-all hover:bg-[var(--detail-surface-highest)]">
                    <Heart size={20} /> Simpan
                </button>
                <button className="chlorophyll-gradient flex flex-[2] items-center justify-center gap-2 rounded-xl px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02]">
                    <Ticket size={20} /> {bookingLabel}
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

interface DestinationDetailPageProps {
    destination: DestinationDetail | null;
}

function DestinationNotFound() {
    return (
        <div className="destination-detail-experience min-h-screen bg-[var(--detail-surface-low)] px-6 py-24">
            <Head title="Destinasi Tidak Ditemukan" />
            <div className="mx-auto max-w-3xl rounded-[2rem] bg-[var(--detail-surface-lowest)] p-10 text-center shadow-sm">
                <h1 className="text-3xl font-bold text-[var(--detail-on-surface)]">Destinasi tidak ditemukan</h1>
                <p className="mt-4 text-base text-[var(--detail-on-surface-variant)]">
                    Halaman detail yang diminta tidak tersedia atau slug destinasi tidak valid.
                </p>
                <Link
                    href="/destinations"
                    className="chlorophyll-gradient mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 font-bold text-white"
                >
                    Kembali ke Destinasi
                </Link>
            </div>
        </div>
    );
}

export default function DestinationDetailPage({ destination }: DestinationDetailPageProps) {
    if (!destination) {
        return <DestinationNotFound />;
    }

    return (
        <div className="destination-detail-experience min-h-screen pb-32">
            <Head title={destination.title} />
            <Nav />
            <DestinationHero destination={destination} />
            <main className="relative z-10 mx-auto mt-[-3rem] max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="space-y-8 lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <DestinationInfo destination={destination} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <SeasonalConditionPanel destination={destination} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <FacilityList destination={destination} />
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
                            <LocationCard destination={destination} />
                            <ReviewSummary destination={destination} />
                        </div>
                    </motion.div>
                </div>
            </main>
            <div className="px-6 pb-40 md:pb-44">
                <Footer className="mx-auto mt-16 max-w-7xl rounded-[2.5rem]" />
            </div>
            {/* <BottomBar bookingLabel={destination.bookingLabel} /> */}
            <MobileNav />
        </div>
    );
}
