import { motion } from 'motion/react';

export default function SeasonalSpotlightsSection() {
    return (
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
                        Agrowisata Batu dipengaruhi oleh pola musim, curah hujan, dan kondisi dataran tinggi yang sejuk. Dari musim panen buah hingga
                        masa mekar bunga terbaik, temukan waktu kunjungan yang paling sesuai untuk pengalaman wisata yang lebih optimal.
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
    );
}
