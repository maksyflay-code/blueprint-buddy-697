import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface RevenuePoint {
  mes: string;
  locacao: number;
  obras: number;
}

function fmtK(v: number) {
  return `R$ ${v}k`;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((a: number, p: any) => a + p.value, 0);
  return (
    <div className="bg-card border border-border rounded-md shadow-lg p-3 min-w-[160px]">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 text-xs mb-1">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-sm" style={{ background: p.color }} />
            <span className="capitalize">{p.dataKey === "obras" ? "Obras" : "Locação"}</span>
          </div>
          <span className="font-mono font-semibold">{fmtK(p.value)}</span>
        </div>
      ))}
      <div className="border-t border-border mt-2 pt-2 flex justify-between text-xs">
        <span className="text-muted-foreground">Total</span>
        <span className="font-mono font-bold">{fmtK(total)}</span>
      </div>
    </div>
  );
}

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-56 w-full bg-accent/20 animate-pulse rounded" />;

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="gradLocacao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradObras" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--success)" stopOpacity={0.55} />
              <stop offset="100%" stopColor="var(--success)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false} opacity={0.6} />
          <XAxis
            dataKey="mes"
            stroke="var(--muted-foreground)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.05em" }}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}k`}
            style={{ fontFamily: "var(--font-mono)" }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "var(--primary)", strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="locacao"
            stackId="1"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#gradLocacao)"
          />
          <Area
            type="monotone"
            dataKey="obras"
            stackId="1"
            stroke="var(--success)"
            strokeWidth={2}
            fill="url(#gradObras)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
