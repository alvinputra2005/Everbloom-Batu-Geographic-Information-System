import { Link, usePage } from '@inertiajs/react';
import { CalendarDays, Home, Info, Leaf, Map } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface MobileBottomNavItem {
    label: string;
    href: string;
    icon: 'home' | 'explore' | 'calendar' | 'about';
    active?: boolean;
}

interface MobileBottomNavProps {
    items?: MobileBottomNavItem[];
    className?: string;
}

const iconMap = {
    home: Home,
    explore: Leaf,
    calendar: CalendarDays,
    about: Info,
};

const defaultItems: MobileBottomNavItem[] = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Explore', href: '/recommendations', icon: 'explore' },
    { label: 'Calendar', href: '/calendar', icon: 'calendar' },
    { label: 'About', href: '#about', icon: 'about' },
];

export default function MobileBottomNav({ items = defaultItems, className }: MobileBottomNavProps) {
    const { url } = usePage();
    const pathname = url.split('?')[0] || '/';

    const isItemActive = (item: MobileBottomNavItem) => {
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
        <div
            className={cn(
                'fixed inset-x-0 bottom-0 z-50 flex items-center justify-around rounded-t-[3rem] border-t border-white/40 bg-white/85 px-4 pt-3 pb-6 shadow-[0_-12px_40px_rgba(27,28,25,0.06)] backdrop-blur-2xl md:hidden dark:bg-[var(--app-surface-elevated)]/85',
                className,
            )}
        >
            {items.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                    <Link
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        className={cn(
                            'flex min-w-14 flex-col items-center justify-center gap-1 p-2 text-[var(--app-text-muted)] transition hover:opacity-80',
                            isItemActive(item) && '-translate-y-2 scale-110 rounded-full bg-[var(--app-primary-strong)] px-3 py-3 text-white',
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="text-[10px] font-semibold">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
