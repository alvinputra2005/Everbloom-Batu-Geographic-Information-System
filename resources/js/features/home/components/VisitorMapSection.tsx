import { motion } from 'motion/react';

import LiveLocationMap from '@/components/map/LiveLocationMap';

export default function VisitorMapSection() {
    return (
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
                        Tekan icon lokasi untuk langsung menuju peta, lalu izinkan akses lokasi agar sistem menampilkan titik posisimu secara otomatis
                        di area Batu.
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
    );
}
