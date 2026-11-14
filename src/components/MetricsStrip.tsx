import { useEffect, useRef, useState } from 'react';
import { UiDictionary } from '../data/translations';
import { ResearchMetrics } from '../types/portfolio';

interface MetricsStripProps {
  metrics: ResearchMetrics;
  t: UiDictionary['metrics'];
}

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(target);
      return;
    }

    const node = elRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const duration = 700;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Number.isInteger(target)
              ? Math.round(eased * target)
              : Number((eased * target).toFixed(1));
            setDisplay(current);
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={elRef} className="font-mono tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function MetricsStrip({ metrics, t }: MetricsStripProps) {
  const numericScore = parseFloat(metrics.pharmdPercentage) || 85.2;
  const hasPercent = metrics.pharmdPercentage.includes('%');

  const items = [
    {
      value: <AnimatedNumber target={metrics.articles} />,
      label: t.articlesLabel,
      context: t.articlesContext,
    },
    {
      value: <AnimatedNumber target={metrics.citations} />,
      label: t.citationsLabel,
      context: t.citationsContext,
    },
    {
      value: <AnimatedNumber target={metrics.hIndex} />,
      label: t.hIndexLabel,
      context: t.hIndexContext,
    },
    {
      value: <AnimatedNumber target={numericScore} suffix={hasPercent ? '%' : ''} />,
      label: t.pharmdLabel,
      context: t.pharmdContext,
    },
  ];

  return (
    <section
      aria-label="Key Research and Academic Metrics"
      className="no-print border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-y divide-slate-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="px-6 py-6">
            <div className="text-3xl font-semibold tracking-tight text-slate-950">{item.value}</div>
            <div className="mt-1.5 text-sm font-semibold text-slate-800">{item.label}</div>
            <div className="mt-0.5 text-xs text-slate-500">{item.context}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
