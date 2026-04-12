import { Car, Tent, Utensils, Waves, Wifi } from 'lucide-react';

const facilities = [
    { icon: Car, label: 'Parkir Luas' },
    { icon: Utensils, label: 'Restoran & Cafe' },
    { icon: Waves, label: 'Toilet Bersih' },
    { icon: Tent, label: 'Musholla' },
    { icon: Wifi, label: 'Free Wi-Fi' },
];

export default function FacilityList() {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--detail-on-surface)]">Fasilitas & Layanan</h2>
            <div className="flex flex-wrap gap-4">
                {facilities.map((facility, index) => (
                    <div
                        key={index}
                        className="cursor-default rounded-full border border-[var(--detail-surface-high)] bg-white px-6 py-4 shadow-sm transition-colors hover:border-[var(--detail-primary)]"
                    >
                        <div className="flex items-center gap-3">
                            <facility.icon className="text-[var(--detail-primary)]" size={20} />
                            <span className="font-medium text-[var(--detail-on-surface)]">{facility.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
