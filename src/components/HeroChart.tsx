"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const W = 440;
const H = 300;
const PAD = { top: 36, right: 20, bottom: 40, left: 48 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const POINTS = 48;

type Series = {
  id: string;
  label: string;
  color: string;
  data: number[];
  fill?: boolean;
};

function seedSeries(base: number, variance: number, phase = 0): number[] {
  return Array.from({ length: POINTS }, (_, i) => {
    const wave =
      Math.sin((i + phase) * 0.28) * variance +
      Math.cos((i + phase) * 0.11) * (variance * 0.45);
    return base + wave + (Math.random() - 0.5) * (variance * 0.15);
  });
}

function smoothPath(
  data: number[],
  x: (i: number) => number,
  y: (v: number) => number
): string {
  if (data.length < 2) return "";

  const pts = data.map((v, i) => ({ x: x(i), y: y(v) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

function areaPath(
  data: number[],
  x: (i: number) => number,
  y: (v: number) => number,
  baseline: number
): string {
  const line = smoothPath(data, x, y);
  const lastX = x(data.length - 1);
  const firstX = x(0);
  return `${line} L ${lastX} ${baseline} L ${firstX} ${baseline} Z`;
}

function shiftSeries(data: number[], next: number): number[] {
  return [...data.slice(1), next];
}

function nextValue(prev: number, base: number, variance: number, tick: number): number {
  const wave = Math.sin(tick * 0.28) * variance + Math.cos(tick * 0.11) * (variance * 0.45);
  const target = base + wave;
  return prev + (target - prev) * 0.18 + (Math.random() - 0.5) * 0.4;
}

export function HeroChart() {
  const tickRef = useRef(POINTS);
  const frameRef = useRef<number | null>(null);
  const [series, setSeries] = useState<Series[]>(() => [
    {
      id: "throughput",
      label: "Throughput",
      color: "var(--chart-line-1)",
      data: seedSeries(72, 14, 0),
      fill: true,
    },
    {
      id: "latency",
      label: "Latency",
      color: "var(--chart-line-2)",
      data: seedSeries(48, 10, 4),
    },
    {
      id: "errors",
      label: "Error rate",
      color: "var(--chart-line-3)",
      data: seedSeries(22, 6, 8),
    },
  ]);
  const [cursor, setCursor] = useState(POINTS - 8);
  const [stats, setStats] = useState({ throughput: 0, latency: 0, errors: 0 });

  const yDomain = useMemo(() => [0, 100] as const, []);
  const x = (i: number) => PAD.left + (i / (POINTS - 1)) * PLOT_W;
  const y = (v: number) =>
    PAD.top + PLOT_H - ((v - yDomain[0]) / (yDomain[1] - yDomain[0])) * PLOT_H;
  const baseline = y(0);

  useEffect(() => {
    let last = performance.now();

    const animate = (now: number) => {
      if (now - last > 120) {
        last = now;
        tickRef.current += 1;

        setSeries((prev) => {
          const updated = prev.map((s, idx) => {
            const bases = [72, 48, 22];
            const vars = [14, 10, 6];
            const lastVal = s.data[s.data.length - 1];
            const next = nextValue(lastVal, bases[idx], vars[idx], tickRef.current + idx * 4);
            return { ...s, data: shiftSeries(s.data, next) };
          });

          setStats({
            throughput: Math.round(updated[0].data[updated[0].data.length - 1]),
            latency: Math.round(updated[1].data[updated[1].data.length - 1]),
            errors: Number(updated[2].data[updated[2].data.length - 1].toFixed(1)),
          });

          setCursor((c) => (c >= POINTS - 2 ? 0 : c + 1));
          return updated;
        });
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const yTicks = [0, 25, 50, 75, 100];
  const bars = series[0].data.slice(-12).map((v) => (v / 100) * 36);

  return (
    <div className="hero-chart animate-fade-up delay-200 w-full max-w-md justify-self-center lg:max-w-none lg:justify-self-end">
      <div className="rounded-2xl border border-border bg-surface/90 p-4 shadow-[0_0_60px_rgba(34,211,238,0.06)] backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-widest text-accent uppercase">
              Live Telemetry
            </p>
            <p className="text-xs text-muted">React · D3-style viz</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[10px] text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            streaming
          </span>
        </div>

        <div className="mb-3 grid grid-cols-3 gap-2">
          <Metric label="req/s" value={`${stats.throughput}`} />
          <Metric label="p95 ms" value={`${stats.latency}`} />
          <Metric label="err %" value={`${stats.errors}`} />
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Animated multi-series telemetry chart"
        >
          <defs>
            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-line-1)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--chart-line-1)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {yTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD.left}
                y1={y(tick)}
                x2={W - PAD.right}
                y2={y(tick)}
                className="chart-grid"
              />
              <text
                x={PAD.left - 8}
                y={y(tick) + 3}
                textAnchor="end"
                className="chart-axis-label"
              >
                {tick}
              </text>
            </g>
          ))}

          {Array.from({ length: 7 }, (_, i) => {
            const gx = PAD.left + (i / 6) * PLOT_W;
            return (
              <line
                key={i}
                x1={gx}
                y1={PAD.top}
                x2={gx}
                y2={H - PAD.bottom}
                className="chart-grid-vertical"
              />
            );
          })}

          {series[0].fill && (
            <path
              d={areaPath(series[0].data, x, y, baseline)}
              fill="url(#area-gradient)"
            />
          )}

          {series.map((s) => (
            <path
              key={s.id}
              d={smoothPath(s.data, x, y)}
              fill="none"
              stroke={s.color}
              strokeWidth={s.fill ? 2.5 : 1.75}
              strokeLinecap="round"
              filter={s.fill ? "url(#glow)" : undefined}
              className="chart-line"
            />
          ))}

          <line
            x1={x(cursor)}
            y1={PAD.top}
            x2={x(cursor)}
            y2={H - PAD.bottom}
            className="chart-crosshair"
          />

          {series.map((s) => {
            const v = s.data[cursor];
            return (
              <circle
                key={`${s.id}-dot`}
                cx={x(cursor)}
                cy={y(v)}
                r={s.fill ? 4 : 3}
                fill="var(--color-background)"
                stroke={s.color}
                strokeWidth={2}
              />
            );
          })}

          <g transform={`translate(${PAD.left}, ${H - 18})`}>
            {bars.map((h, i) => (
              <rect
                key={i}
                x={i * 14}
                y={36 - h}
                width={10}
                height={h}
                rx={2}
                className="chart-bar"
                opacity={0.35 + (i / bars.length) * 0.65}
              />
            ))}
          </g>

          <g transform={`translate(${PAD.left}, ${H - PAD.bottom + 18})`}>
            {series.map((s, i) => (
              <g key={s.id} transform={`translate(${i * 108}, 0)`}>
                <line x1={0} y1={0} x2={14} y2={0} stroke={s.color} strokeWidth={2} />
                <text x={20} y={4} className="chart-legend">
                  {s.label}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface-elevated/80 px-2.5 py-2">
      <p className="font-mono text-sm font-semibold text-foreground">{value}</p>
      <p className="font-mono text-[10px] text-muted">{label}</p>
    </div>
  );
}
