'use client';

import { useCallback, useEffect } from 'react';

interface Params {
  action: () => void;
  condition: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({ action, condition, threshold = 1 }: Params) => {
  const onScroll = useCallback(
    (e: Event) => {
      const target = e.target;
      const scrollingElement =
        target instanceof Element
          ? (target as HTMLElement)
          : ((document.scrollingElement as HTMLElement | null) ?? document.documentElement);

      const { scrollHeight, scrollTop, clientHeight } = scrollingElement;
      if (condition && (scrollHeight - scrollTop) * threshold < clientHeight) action();
    },
    [action, condition, threshold],
  );

  useEffect(() => {
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => document.removeEventListener('scroll', onScroll, true);
  }, [onScroll]);
};
