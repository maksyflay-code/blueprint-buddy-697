import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export interface UtilSlice {
  name: string;
  value: number;
  color: string;
}

export function UtilizationDonut({
  data,
  centerLabel,
  centerValue,
}: {
  data: UtilSlice[];
  centerLabel: string;
  centerValue: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-48 w-full bg-accent/20 animate-pulse rounded" />;

  return (
    <div className="relative h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            dataKey="value"
            stroke="hsl(var(--card))"
            strokeWidth={2}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 6,
              fontSize: 11,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold tracking-tight">{centerValue}</div>
        <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
          {centerLabel}
        </div>
      </div>
    </div>
  );
}
