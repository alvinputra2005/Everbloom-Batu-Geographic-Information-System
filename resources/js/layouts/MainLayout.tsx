import type { ReactNode } from 'react';

import FloatingActionButton from '@/components/common/FloatingActionButton';
import Footer from '@/components/common/Footer';
import MobileBottomNav, { type MobileBottomNavItem } from '@/components/common/MobileBottomNav';
import Navbar, { type NavbarItem } from '@/components/common/Navbar';

interface MainLayoutProps {
    children: ReactNode;
    withFooter?: boolean;
    withMobileBottomNav?: boolean;
    withFloatingActionButton?: boolean;
    navbarItems?: NavbarItem[];
    mobileBottomNavItems?: MobileBottomNavItem[];
}

export default function MainLayout({
    children,
    withFooter = true,
    withMobileBottomNav = true,
    withFloatingActionButton = true,
    navbarItems,
    mobileBottomNavItems,
}: MainLayoutProps) {
    return (
        <div
            data-layout="main"
            className="min-h-screen bg-[var(--app-surface)] font-sans text-[var(--app-text)] selection:bg-[var(--app-primary)]/20"
        >
            <Navbar items={navbarItems} />
            <main className="min-h-screen pt-20 pb-28 md:pb-0">{children}</main>
            {withFooter ? <Footer /> : null}
            {withMobileBottomNav ? <MobileBottomNav items={mobileBottomNavItems} /> : null}
            {withFloatingActionButton ? <FloatingActionButton /> : null}
        </div>
    );
}
