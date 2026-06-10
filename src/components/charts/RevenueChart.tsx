import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useChartSize } from "./useChartSize";

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
  const { ref, width } = useChartSize();
  return (
    <div ref={ref} className="h-56 w-full">
      {width > 0 && (
        <AreaChart
          width={width}
          height={224}
          data={data}
          margin={{ top: 10, right: 8, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient id="gradLocacao" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.18 45)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="oklch(0.68 0.18 45)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="gradObras" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.7 0.16 155)" stopOpacity={0.55} />
              <stop offset="100%" stopColor="oklch(0.7 0.16 155)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="oklch(0.9 0.01 264)" vertical={false} opacity={0.6} />
          <XAxis
            dataKey="mes"
            stroke="oklch(0.55 0.02 264)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
          />
          <YAxis
            stroke="oklch(0.55 0.02 264)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "oklch(0.68 0.18 45)", strokeWidth: 1, strokeDasharray: "3 3" }}
          />
          <Area
            type="monotone"
            dataKey="locacao"
            stackId="1"
            stroke="oklch(0.68 0.18 45)"
            strokeWidth={2}
            fill="url(#gradLocacao)"
          />
          <Area
            type="monotone"
            dataKey="obras"
            stackId="1"
            stroke="oklch(0.7 0.16 155)"
            strokeWidth={2}
            fill="url(#gradObras)"
          />
        </AreaChart>
      )}
    </div>
  );
}
