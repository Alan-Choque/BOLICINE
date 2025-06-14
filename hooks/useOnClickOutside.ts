import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current;
            // No hagas nada si el clic es en el propio elemento o sus descendientes
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }
            handler(event); // Llama al handler que pasamos (en nuestro caso, setIsSearchOpen(false))
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]); // Vuelve a ejecutar el efecto si el ref o el handler cambian
};