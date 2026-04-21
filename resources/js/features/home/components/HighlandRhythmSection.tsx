import { CloudRain, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export default function HighlandRhythmSection() {
    return (
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
                            Agrowisata Batu dipengaruhi oleh curah hujan, suhu dataran tinggi, dan siklus panen setiap komoditas. Dengan memahami
                            musim panen dan masa mekar, kamu bisa memilih waktu kunjungan terbaik.
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
                                    Curah hujan yang tinggi membuat banyak tanaman tetap tumbuh subur. Periode ini cocok untuk menikmati wisata kebun
                                    bunga dan beberapa kebun stroberi yang tetap aktif menerima kunjungan.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 rounded-l-full rounded-r-[2rem] border-l-4 border-[var(--app-primary-strong)] bg-stone-100 p-6">
                            <div className="rounded-full bg-[color:rgba(47,107,61,0.1)] p-3">
                                <Sun className="h-6 w-6 text-[var(--app-primary-strong)]" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">Juni - Agustus (Musim Puncak Panen)</h4>
                                <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                                    Udara yang lebih sejuk dan kondisi yang lebih kering membuat banyak komoditas berada pada periode terbaiknya. Ini
                                    adalah salah satu musim paling ideal untuk menikmati wisata petik buah dan kebun bunga di Batu.
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
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute right-6 bottom-6 left-6 flex gap-4">
                            <div className="flex-1 rounded-[1.5rem] bg-white/90 p-4 backdrop-blur-md">
                                <div className="text-2xl font-bold text-[var(--app-primary)]">22 derajat C</div>
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
    );
}
