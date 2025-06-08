// src/core/utils/useIntersectionObserver.ts
import { useEffect, useRef, useCallback, useMemo } from "react";

interface UseIntersectionObserverProps {
  callback: () => void;
  unObserve?: boolean;
  options?: IntersectionObserverInit;
}

export default function useIntersectionObserver({
  callback,
  unObserve = false,
  options,
}: UseIntersectionObserverProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const observerOptions = useMemo<IntersectionObserverInit>(
    () => ({
      root: null,
      rootMargin: "30px",
      threshold: 0,
      ...options,
    }),
    [options]
  );

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
    if (typeof window === "undefined" || !targetRef.current || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver, observerOptions]);

  return targetRef;
}
