import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useChartSize } from "./useChartSize";

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
  const { ref, width } = useChartSize();
  const height = 192; // h-48
  const size = Math.min(width || 0, height);

  return (
    <div ref={ref} className="relative h-48 w-full flex items-center justify-center">
      {width > 0 && (
        <PieChart width={width} height={height}>
          <Pie
            data={data}
            innerRadius={size * 0.31}
            outerRadius={size * 0.46}
            paddingAngle={2}
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              fontSize: 11,
            }}
          />
        </PieChart>
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-2xl font-bold tracking-tight">{centerValue}</div>
        <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">
          {centerLabel}
        </div>
      </div>
    </div>
  );
}
