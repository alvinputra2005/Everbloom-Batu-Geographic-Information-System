import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionContainerProps extends ComponentPropsWithoutRef<'section'> {
    children: ReactNode;
    contentClassName?: string;
}

export default function SectionContainer({ children, className, contentClassName, ...props }: SectionContainerProps) {
    return (
        <section className={cn('px-4 py-16 sm:px-6 lg:px-8 lg:py-8', className)} {...props}>
            <div className={cn('mx-auto w-full max-w-7xl', contentClassName)}>{children}</div>
        </section>
    );
}
