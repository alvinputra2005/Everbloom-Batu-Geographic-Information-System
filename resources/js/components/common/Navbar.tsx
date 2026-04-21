import { Link, usePage } from '@inertiajs/react';

import { cn } from '@/lib/utils';

export interface NavbarItem {
    label: string;
    href: string;
    active?: boolean;
}

interface NavbarProps {
    brand?: string;
    items?: NavbarItem[];
    className?: string;
}

const defaultItems: NavbarItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Destinasi', href: '/destinations' },
    { label: 'Kalender', href: '/calendar' },
    { label: 'Tentang', href: '/tentang' },
];

export default function Navbar({ brand = 'Everbloom', items = defaultItems, className }: NavbarProps) {
    const { url } = usePage();
    const pathname = url.split('?')[0] || '/';

    const isItemActive = (item: NavbarItem) => {
        if (typeof item.active === 'boolean') {
            return item.active;
        }

        if (!item.href.startsWith('/')) {
            return false;
        }

        if (item.href === '/') {
            return pathname === '/';
        }

        return pathname === item.href || pathname.startsWith(`${item.href}/`);
    };

    return (
        <nav
            className={cn(
                'fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-[var(--app-surface-glass)] text-[var(--app-text)] shadow-[0_12px_40px_rgba(27,28,25,0.06)] backdrop-blur-xl',
                className,
            )}
        >
            <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="bg-[linear-gradient(135deg,var(--app-primary)_0%,var(--app-primary-strong)_100%)] bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl"
                >
                    {brand}
                </Link>

                <div className="hidden items-center gap-8 text-l font-medium tracking-tight md:flex">
                    {items.map((item) => (
                        <div key={`${item.label}-${item.href}`} className="relative">
                            <Link
                                href={item.href}
                                className={cn(
                                    'relative inline-flex pb-1 text-[var(--app-text-muted)] transition-colors duration-300 hover:text-[var(--app-primary)]',
                                    isItemActive(item) && 'font-bold text-[var(--app-primary)]',
                                )}
                            >
                                {item.label}
                                <span
                                    className={cn(
                                        'absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full bg-[var(--app-primary)] transition-transform duration-300',
                                        isItemActive(item) ? 'scale-x-100' : 'scale-x-0',
                                    )}
                                />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    {/* <button type="button" aria-label="Notifications" className={iconButtonClassName}>
                        <Bell className="h-6 w-6" />
                    </button>
                    <button type="button" aria-label="Account" className={iconButtonClassName}>
                        <CircleUserRound className="h-6 w-6" />
                    </button> */}
                </div>
            </div>
        </nav>
    );
}
