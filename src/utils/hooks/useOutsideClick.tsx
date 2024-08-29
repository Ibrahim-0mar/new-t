

import { RefObject, useEffect, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(close: () => void): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    }

    window.addEventListener("click", handleClick, true);

    return () => window.removeEventListener("click", handleClick, true);
  }, [close]);

  return ref;
}
