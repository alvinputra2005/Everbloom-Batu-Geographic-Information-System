import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

export interface FooterLink {
    label: string;
    href: string;
}

interface FooterProps {
    brand?: string;
    description?: string;
    links?: FooterLink[];
    className?: string;
}

const defaultLinks: FooterLink[] = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Feedback', href: '#' },
];

export default function Footer({
    brand = 'Everbloom',
    description = '© 2026 Everbloom. The Modern Naturalist’s Guide.',
    links = defaultLinks,
    className,
}: FooterProps) {
    return (
        <footer
            className={cn(
                'mt-12 rounded-t-[3rem] bg-[var(--app-surface-muted)] px-4 py-12 text-[var(--app-text)] sm:px-6 lg:px-8',
                className,
            )}
        >
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex flex-col items-center gap-2 md:items-start">
                    <Link href="/" className="text-lg font-bold text-[var(--app-primary)]">
                        {brand}
                    </Link>
                    <p className="text-center text-sm text-[var(--app-text-muted)] md:text-left">{description}</p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link) => (
                        <Link
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            className="text-[var(--app-text-muted)] transition hover:text-[var(--app-primary)] hover:underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
