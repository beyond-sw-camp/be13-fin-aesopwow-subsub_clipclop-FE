// src/core/utils/useIntersectionObserver.ts
import { useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverProps {
  callback: () => void;
  unObserve?: boolean;
  options?: IntersectionObserverInit;
}

export default function useIntersectionObserver({
  callback,
  unObserve = false,
  options = {
    root: null,
    rootMargin: "30px",
    threshold: 0,
  },
}: UseIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          if (unObserve) observer.unobserve(entry.target);
        }
      });
    },
    [callback, unObserve]
  );

  useEffect(() => {
    if (!targetRef.current || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, [handleObserver, options]);

  return targetRef;
}
