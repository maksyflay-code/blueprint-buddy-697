import { useEffect, useState } from "react";

export interface FunnelStage {
  etapa: string;
  quantidade: number;
  valor: number;
}

function fmtM(v: number) {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(1).replace(".", ",")}M`;
  return `R$ ${(v / 1_000).toFixed(0)}k`;
}

export function FunnelChartCustom({ data }: { data: FunnelStage[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const max = Math.max(...data.map((d) => d.valor));

  return (
    <div className="space-y-1.5">
      {data.map((stage, i) => {
        const ratio = stage.valor / max;
        const widthPct = 30 + ratio * 70;
        const intensity = 1 - i * 0.13;
        return (
          <div key={stage.etapa} className="group">
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-muted-foreground w-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold">{stage.etapa}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-mono text-muted-foreground">{stage.quantidade}</span>
                <span className="text-xs font-mono font-bold">{fmtM(stage.valor)}</span>
              </div>
            </div>
            <div className="relative h-7 flex items-center">
              <div
                className="h-full rounded-sm transition-all duration-500 ease-out relative overflow-hidden"
                style={{
                  width: mounted ? `${widthPct}%` : "0%",
                  background: `linear-gradient(90deg,
                    hsl(var(--primary) / ${0.85 * intensity}) 0%,
                    hsl(var(--primary) / ${0.55 * intensity}) 100%)`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
