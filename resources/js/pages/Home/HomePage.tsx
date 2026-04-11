import SectionContainer from '@/components/common/SectionContainer';
import MainLayout from '@/layouts/MainLayout';

export default function HomePage() {
    return (
        <MainLayout>
            <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(150,213,157,0.28),transparent_38%),linear-gradient(180deg,rgba(250,249,244,0.1)_0%,rgba(250,249,244,1)_72%)]" />
                <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
                    <span className="mb-6 inline-flex rounded-full bg-[var(--app-chip)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--app-primary)]">
                        Discovery Batu
                    </span>
                    <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-[var(--app-text)] md:text-6xl">
                        Baseline antarmuka untuk halaman agrowisata berikutnya.
                    </h1>
                    <p className="mt-6 max-w-2xl text-base font-medium text-[var(--app-text-muted)] md:text-lg">
                        Komponen universal sudah dipisahkan ke layout utama agar halaman baru cukup fokus ke konten inti dan logika bisnis.
                    </p>
                </div>
            </section>

            <SectionContainer className="pt-0">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        'Navbar reusable untuk desktop',
                        'Footer konsisten lintas halaman',
                        'Mobile bottom navigation untuk layar kecil',
                        'Section container untuk pembungkus konten',
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_12px_40px_rgba(27,28,25,0.04)] backdrop-blur"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--app-primary)]">Baseline</p>
                            <p className="mt-3 text-lg font-bold text-[var(--app-text)]">{item}</p>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </MainLayout>
    );
}
