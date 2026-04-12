import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

import cekKondisiIcon from '../../../images/Cek-kondisi.png';
import nikmatiWisataAlamIcon from '../../../images/Nikmati-wisata-alam.png';
import tentukanTanggalKunjunganIcon from '../../../images/Tentukan-tanggal-kunjungan.png';
import { AlertTriangle, ArrowRight, Calendar, ChevronDown, CloudRain, Leaf, Sun } from 'lucide-react';
import { motion } from 'motion/react';

import DestinationCard from '@/components/common/DestinationCard';
import LiveLocationMap from '@/components/map/LiveLocationMap';
import { destinationFilters, getFeaturedDestinations } from '@/features/home/data';
import MainLayout from '@/layouts/MainLayout';

interface JourneyStep {
    icon: ReactNode;
    title: string;
    desc: string;
    color: string;
}

const journeySteps: JourneyStep[] = [
    {
        icon: <img src={cekKondisiIcon} alt="Cek kondisi" className="h-9 w-9 object-contain md:h-10 md:w-10" />,
        title: '1. Cek kondisi ',
        desc: 'Periksa kondisi panen, musim mekar, dan kesiapan kunjungan di berbagai destinasi agrowisata Kota Batu.',
        color: 'bg-[color:rgba(19,82,39,0.1)]',
    },
    {
        icon: <img src={tentukanTanggalKunjunganIcon} alt="Tentukan tanggal kunjungan" className="h-9 w-9 object-contain md:h-10 md:w-10" />,
        title: '2. Tentukan Tanggal Kunjungan',
        desc: 'Pilih tanggal kunjungan pada periode panen atau masa mekar terbaik agar pengalaman wisatamu lebih maksimal.',
        color: 'bg-[color:rgba(19,82,39,0.1)]',
    },
    {
        icon: <img src={nikmatiWisataAlamIcon} alt="Nikmati wisata alam" className="h-9 w-9 object-contain md:h-10 md:w-10" />,
        title: '3. Nikmati Wisata Alam',
        desc: 'Datang ke destinasi pilihanmu dan nikmati pengalaman agrowisata secara langsung,',
        color: 'bg-[color:rgba(19,82,39,0.1)]',
    },
];

export default function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const featuredDestinations = getFeaturedDestinations(activeCategory);

    return (
        <MainLayout>
            <div className="home-bloom-page overflow-hidden bg-[var(--app-surface)] text-[var(--app-text)]">
                <section className="relative -mt-20 flex min-h-[85vh] items-center justify-center overflow-hidden px-6 pt-20 sm:px-8">
                    <div className="absolute inset-0 z-0">
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
                            className="mb-10 text-5xl leading-[1.1] font-bold tracking-tight text-[var(--app-text)] md:text-7xl"
                        >
                            Temukan waktu terbaik untuk mengunjungi destinasi{' '}
                            <span className="text-[var(--app-primary)] italic">agrowisata</span>{' '}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.45 }}
                            className="ambient-bloom flex flex-col items-center gap-4 rounded-[2rem] bg-white/80 p-4 backdrop-blur-2xl md:flex-row md:p-6"
                        >
                            <div className="relative w-full text-left md:flex-1">
                                <Calendar className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--app-primary)]" />
                                <input
                                    className="w-full rounded-full border-none bg-stone-100/60 py-4 pr-4 pl-12 text-[var(--app-text)] ring-0 outline-none placeholder:text-[color:rgba(68,72,61,0.65)] focus:ring-2 focus:ring-[color:rgba(19,82,39,0.16)]"
                                    placeholder="Tanggal berkunjung"
                                    type="text"
                                />
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
                                className="chlorophyll-gradient w-full rounded-[1.25rem] px-10 py-4 font-bold text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:translate-y-0.5 md:w-auto"
                            >
                                Dapatkan rekomendasi
                            </button>
                        </motion.div>
                    </div>
                </section>

                <section className="mx-auto mt-9 max-w-7xl px-8 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Perjalanan menuju agrowisata yang mudah</h2>
                        <p className="text-[var(--app-text-muted)]">Langkah sederhana untuk merencanakan hari kunjungan terbaikmu.</p>
                    </div>
                    <div className="grid gap-12 md:grid-cols-3">
                        {journeySteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.4 }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <div
                                    className={`mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.5rem] ${step.color} p-4 transition-transform group-hover:scale-110 md:h-20 md:w-20`}
                                >
                                    {step.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                                <p className="leading-relaxed text-[var(--app-text-muted)]">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section id="calendar" className="mx-auto mb-24 max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45 }}
                        className="ambient-bloom flex flex-col items-center justify-between gap-8 rounded-[2rem] border border-stone-200 bg-stone-100 p-10 md:flex-row"
                    >
                        <div className="flex-1 space-y-4">
                            <h2 className="text-3xl font-bold text-[var(--app-primary)]">Pola Musim Agrowisata Batu</h2>
                            <p className="text-lg text-[var(--app-text-muted)]">
                                Agrowisata Batu dipengaruhi oleh pola musim, curah hujan, dan kondisi dataran tinggi yang sejuk. Dari musim panen buah
                                hingga masa mekar bunga terbaik, temukan waktu kunjungan yang paling sesuai untuk pengalaman wisata yang lebih
                                optimal.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="rounded-full bg-[var(--app-primary)] px-8 py-4 font-bold whitespace-nowrap text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:bg-[var(--app-primary-strong)]"
                        >
                            Lihat Kalender
                        </button>
                    </motion.div>
                </section>

                <section id="recommendations" className="mx-auto mb-24 max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45 }}
                        className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
                    >
                        <div>
                            <h2 className="mt-2 text-4xl font-bold">Destinasi Populer</h2>
                            <p className="mt-3 max-w-2xl text-[var(--app-text-muted)]">
                                Tampilkan destinasi buah dan bunga terbaik di Batu dengan foto lokal yang sudah disesuaikan agar tampil seragam.
                            </p>
                        </div>
                        <Link
                            href={`/destinations${activeCategory === 'all' ? '' : `?category=${activeCategory}`}`}
                            className="flex items-center gap-2 font-bold text-[var(--app-primary)] transition-all hover:gap-3"
                        >
                            Lihat Semua <ArrowRight className="h-5 w-5" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        className="mb-8 flex flex-wrap gap-3"
                    >
                        {destinationFilters.map((filter) => (
                            <button
                                key={filter.key}
                                type="button"
                                onClick={() => setActiveCategory(filter.key)}
                                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                                    activeCategory === filter.key
                                        ? 'border-[var(--app-primary)] bg-[var(--app-primary)] text-white shadow-lg shadow-[color:rgba(19,82,39,0.15)]'
                                        : 'border-stone-200 bg-white text-[var(--app-text-muted)] hover:border-[var(--app-primary)] hover:text-[var(--app-primary)]'
                                }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {featuredDestinations.map((destination, index) => (
                            <motion.div
                                key={destination.slug}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.45, delay: index * 0.08 }}
                            >
                                <DestinationCard destination={destination} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mx-auto mb-24 max-w-7xl px-6">
                    <div className="flex flex-col items-center gap-12 lg:flex-row">
                        <motion.div
                            initial={{ opacity: 0, x: -32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8 lg:w-1/2"
                        >
                            <div>
                                <h2 className="mb-6 text-4xl font-bold">Panduan Musim Agrowisata</h2>
                                <p className="text-lg leading-relaxed text-[var(--app-text-muted)]">
                                    Agrowisata Batu dipengaruhi oleh curah hujan, suhu dataran tinggi, dan siklus panen setiap komoditas. Dengan memahami musim panen dan masa mekar, kamu bisa memilih waktu kunjungan terbaik.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-l-full rounded-r-[2rem] border-l-4 border-[var(--app-primary)] bg-stone-100 p-6">
                                    <div className="rounded-full bg-[color:rgba(19,82,39,0.1)] p-3">
                                        <CloudRain className="h-6 w-6 text-[var(--app-primary)]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">Februari (Musim Hujan)</h4>
                                        <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                                            Curah hujan yang tinggi membuat banyak tanaman tetap tumbuh subur. Periode ini cocok untuk menikmati wisata kebun bunga dan beberapa kebun stroberi yang tetap aktif menerima kunjungan.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-l-full rounded-r-[2rem] border-l-4 border-[var(--app-primary-strong)] bg-stone-100 p-6">
                                    <div className="rounded-full bg-[color:rgba(47,107,61,0.1)] p-3">
                                        <Sun className="h-6 w-6 text-[var(--app-primary-strong)]" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">Juni – Agustus (Musim Puncak Panen)</h4>
                                        <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                                            Udara yang lebih sejuk dan kondisi yang lebih kering membuat banyak komoditas berada pada periode terbaiknya. Ini adalah salah satu musim paling ideal untuk menikmati wisata petik buah dan kebun bunga di Batu.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="group relative lg:w-1/2"
                        >
                            <div className="relative overflow-hidden rounded-[3rem] shadow-2xl">
                                <img
                                    alt="Batu Seasonal Harvest Fruits"
                                    className="aspect-[1.2/1] w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaAM0qafZVLQZXpFXeLnRvWi3OzK7OQ6hAkKlncF51DYSHLC9jpwh6ZjPFhP2hBNxfZmWkGYS2MJ_Tto8qxQp5uIGI6LM8r7RqheAF1WSd-3wDH3rcZKWuzQud9VNZvZgWZ9DrICqte_Swq3wx9gavqIISCuRAOS2Meg4p_kgPXSSZfxljOohBmn3bkPbMckRM8cOt8nOXaDjj9BB20rNV0vs4g4MEP_vrhGwpHVILprtoRvYuKEPU6ktZwSGqgn_Ki9JAXNUvpvQO"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute right-6 bottom-6 left-6 flex gap-4">
                                    <div className="flex-1 rounded-[1.5rem] bg-white/90 p-4 backdrop-blur-md">
                                        <div className="text-2xl font-bold text-[var(--app-primary)]">22°C</div>
                                        <div className="text-[10px] font-bold tracking-[0.3em] text-[var(--app-text-muted)] uppercase">Rata-rata Suhu</div>
                                    </div>
                                    <div className="flex-1 rounded-[1.5rem] bg-white/90 p-4 backdrop-blur-md">
                                        <div className="text-2xl font-bold text-[var(--app-primary)]">250 mm</div>
                                        <div className="text-[10px] font-bold tracking-[0.3em] text-[var(--app-text-muted)] uppercase">
                                            Curah Hujan Bulanan
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section id="map" className="mx-auto mb-24 max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45 }}
                        className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
                    >
                        <div>
                            <h2 className="text-4xl font-bold">Peta Lokasi Pengunjung</h2>
                            <p className="mt-3 max-w-3xl text-[var(--app-text-muted)]">
                                Tekan icon lokasi untuk langsung menuju peta, lalu izinkan akses lokasi agar sistem menampilkan titik posisimu secara
                                otomatis di area Batu.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                    >
                        <LiveLocationMap />
                    </motion.div>
                </section>

                <section id="about" className="mx-auto mb-24 max-w-7xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45 }}
                        className="flex flex-col items-center justify-between gap-8 rounded-[3rem] border border-[color:rgba(19,82,39,0.1)] bg-[color:rgba(19,82,39,0.05)] p-8 md:flex-row md:p-12"
                    >
                        <div className="max-w-2xl text-center md:text-left">
                            <div className="mb-4">
                                <h2 className="text-3xl font-bold">Jaga Fasilitas dan Lingkungan Bersama</h2>
                            </div>
                            <p className="text-lg text-[var(--app-text-muted)]">
                                Laporkan kerusakan fasilitas atau kendala di area wisata agar lingkungan tetap nyaman, aman, dan terawat.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="chlorophyll-gradient flex items-center gap-2 rounded-[1.25rem] px-8 py-4 font-bold whitespace-nowrap text-white shadow-lg shadow-[color:rgba(19,82,39,0.2)] transition-all hover:translate-y-0.5"
                        >
                            <AlertTriangle className="h-5 w-5" />
                            Lapor Kerusakan Fasilitas
                        </button>
                    </motion.div>
                </section>
            </div>
        </MainLayout>
    );
}
