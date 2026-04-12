import { Clock, CreditCard, Sprout, Users } from 'lucide-react';

const stats = [
    { icon: CreditCard, label: 'HTM Mulai', value: 'Rp 80.000' },
    { icon: Clock, label: 'Jam Buka', value: '08:00 - 17:00' },
    { icon: Sprout, label: 'Komoditas', value: '5 Jenis Buah' },
    { icon: Users, label: 'Cocok Untuk', value: 'Keluarga' },
];

export default function DestinationInfo() {
    return (
        <section className="rounded-t-xl rounded-b-lg bg-[var(--detail-surface-lowest)] p-8 shadow-sm md:p-12">
            <h2 className="mb-6 text-2xl font-bold text-[var(--detail-on-surface)]">Tentang Destinasi</h2>
            <p className="mb-8 text-lg leading-relaxed text-[var(--detail-on-surface-variant)]">
                Kusuma Agro Wisata merupakan pionir agrowisata di Indonesia yang menawarkan pengalaman unik memetik buah
                langsung dari pohonnya. Terletak pada ketinggian 1000 meter di atas permukaan laut, udara sejuk pegunungan
                akan menemani Anda menjelajahi kebun apel, jeruk, stroberi, dan jambu merah.
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, index) => (
                    <div key={index} className="rounded-lg bg-[var(--detail-surface-low)] p-6 text-center">
                        <stat.icon className="mx-auto mb-2 text-[var(--detail-primary)]" size={32} />
                        <div className="text-xs font-bold text-[var(--detail-outline)] uppercase">{stat.label}</div>
                        <div className="text-lg font-bold text-[var(--detail-on-surface)]">{stat.value}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
