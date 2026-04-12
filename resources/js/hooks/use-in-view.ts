import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
    once?: boolean;
}

export function useInView<T extends HTMLElement>({ once = true, threshold = 0.2, root, rootMargin }: UseInViewOptions = {}) {
    const ref = useRef<T | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element || (once && isInView)) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);

                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setIsInView(false);
                }
            },
            { threshold, root, rootMargin },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [isInView, once, root, rootMargin, threshold]);

    return { ref, isInView };
}
