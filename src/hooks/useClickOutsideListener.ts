import {useEffect, useRef} from 'react';

export function useClickOutsideListener<T extends HTMLElement>(onClick: () => void) {
    const ref = useRef<T>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const target = event.target as Node;
            if (ref.current && !ref.current.contains(target)) {
                onClick();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [onClick]);

    return {ref};
}
