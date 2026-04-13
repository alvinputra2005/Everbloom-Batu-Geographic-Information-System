import type { ReactNode } from 'react';

import cekKondisiIcon from '../../../../images/Cek-kondisi.png';
import nikmatiWisataAlamIcon from '../../../../images/Nikmati-wisata-alam.png';
import tentukanTanggalKunjunganIcon from '../../../../images/Tentukan-tanggal-kunjungan.png';
import { motion } from 'motion/react';

interface JourneyStep {
    icon: ReactNode;
    title: string;
    desc: string;
    color: string;
}

const journeySteps: JourneyStep[] = [
    {
        icon: <img src={cekKondisiIcon} alt="Cek kondisi" className="h-9 w-9 object-contain md:h-10 md:w-10" />,
        title: '1. Cek kondisi',
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
        desc: 'Datang ke destinasi pilihanmu dan nikmati pengalaman agrowisata secara langsung.',
        color: 'bg-[color:rgba(19,82,39,0.1)]',
    },
];

export default function JourneySection() {
    return (
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
    );
}
