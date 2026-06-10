import { useEffect, useRef, useState } from "react";

export function useChartSize(initialWidth = 600) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: initialWidth, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: Math.max(0, rect.width), height: Math.max(0, rect.height) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, ...size };
}
