import { useState, useEffect } from 'react';

// Este hook toma un valor (lo que el usuario escribe) y un delay (ej. 500ms)
export function useDebounce<T>(value: T, delay: number): T {
  // Estado para guardar el valor "retrasado"
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crea un temporizador que actualizará el estado después del 'delay'
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el temporizador si el 'value' cambia (ej. el usuario sigue escribiendo)
    // Esto reinicia el conteo y evita que se ejecute la actualización anterior.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Solo se re-ejecuta si el valor o el delay cambian

  return debouncedValue;
}