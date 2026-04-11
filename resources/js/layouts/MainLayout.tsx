import type { ReactNode } from 'react';

import FloatingActionButton from '@/components/common/FloatingActionButton';
import Footer from '@/components/common/Footer';
import MobileBottomNav from '@/components/common/MobileBottomNav';
import Navbar from '@/components/common/Navbar';

interface MainLayoutProps {
    children: ReactNode;
    withFooter?: boolean;
    withMobileBottomNav?: boolean;
    withFloatingActionButton?: boolean;
}

export default function MainLayout({
    children,
    withFooter = true,
    withMobileBottomNav = true,
    withFloatingActionButton = true,
}: MainLayoutProps) {
    return (
        <div
            data-layout="main"
            className="min-h-screen bg-[var(--app-surface)] font-sans text-[var(--app-text)] selection:bg-[var(--app-primary)]/20"
        >
            <Navbar />
            <main className="min-h-screen pt-20 pb-28 md:pb-0">{children}</main>
            {withFooter ? <Footer /> : null}
            {withMobileBottomNav ? <MobileBottomNav /> : null}
            {withFloatingActionButton ? <FloatingActionButton /> : null}
        </div>
    );
}
