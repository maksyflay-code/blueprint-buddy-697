import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { obras, type ObraStatus } from "@/lib/erp-data";
import { Plus, MapPin, Users, Truck, AlertTriangle, HardHat } from "lucide-react";

export const Route = createFileRoute("/obras")({
  head: () => ({
    meta: [
      { title: "Obras / Projetos — Vetor ERP" },
      { name: "description", content: "Gestão de obras em execução." },
    ],
  }),
  component: ObrasPage,
});

function fmtM(v: number) {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")}M`;
  return `R$ ${(v / 1_000).toFixed(0)}k`;
}

const statusMap: Record<ObraStatus, { variant: "success" | "warning" | "destructive" | "muted" | "primary"; label: string }> = {
  planejamento: { variant: "muted", label: "Planejamento" },
  execucao: { variant: "success", label: "Em Execução" },
  paralisada: { variant: "destructive", label: "Paralisada" },
  concluida: { variant: "primary", label: "Concluída" },
};

function ObrasPage() {
  const ativas = obras.filter((o) => o.status === "execucao");
  const totalCarteira = obras.filter((o) => o.status !== "concluida").reduce((a, o) => a + o.valorContrato, 0);
  const totalMedido = obras.reduce((a, o) => a + o.medido, 0);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        <PageHeader
          title="Obras / Projetos"
          subtitle="Carteira física e financeira, equipes e equipamentos por obra."
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Abrir Obra
            </button>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Obras Ativas", value: ativas.length, icon: HardHat },
            { label: "Carteira Total", value: fmtM(totalCarteira), icon: Truck, big: true },
            { label: "Total Medido", value: fmtM(totalMedido), icon: Users, big: true },
            { label: "Paralisadas", value: obras.filter((o) => o.status === "paralisada").length, icon: AlertTriangle, color: "text-destructive" },
          ].map((k) => (
            <div key={k.label} className="bg-card border border-border rounded-md p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{k.label}</div>
                <k.icon className="size-4 text-muted-foreground" />
              </div>
              <div className={`font-bold tracking-tight ${k.big ? "text-xl" : "text-2xl"} ${k.color ?? ""}`}>{k.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {obras.map((o) => {
            const s = statusMap[o.status];
            const gap = o.fisico - o.financeiro;
            return (
              <div key={o.id} className="bg-card border border-border rounded-md p-4 sm:p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">{o.codigo}</div>
                    <div className="font-semibold text-sm leading-tight mt-0.5 truncate">{o.nome}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="size-3" /> {o.cidade}, {o.uf} · {o.contratante}
                    </div>
                  </div>
                  <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
                </div>

                {o.alerta && (
                  <div className="bg-destructive/10 border border-destructive/30 rounded p-2 flex items-center gap-2 text-[11px] text-destructive">
                    <AlertTriangle className="size-3 shrink-0" /> {o.alerta}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Contrato</div>
                    <div className="font-mono font-semibold">{fmtM(o.valorContrato)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Medido</div>
                    <div className="font-mono font-semibold text-primary">{fmtM(o.medido)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Prazo</div>
                    <div className="font-medium">{o.prazoFim}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Responsável</div>
                    <div className="font-medium truncate">{o.responsavel}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="font-bold uppercase tracking-wider text-muted-foreground">Avanço Físico</span>
                      <span className="font-mono font-bold">{o.fisico}%</span>
                    </div>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-success" style={{ width: `${o.fisico}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="font-bold uppercase tracking-wider text-muted-foreground">Avanço Financeiro</span>
                      <span className={`font-mono font-bold ${gap > 5 ? "text-warning-foreground" : ""}`}>{o.financeiro}%</span>
                    </div>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${o.financeiro}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-border text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3 text-muted-foreground" />
                    <span className="font-medium">{o.equipe}</span>
                    <span className="text-muted-foreground">na equipe</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="size-3 text-muted-foreground" />
                    <span className="font-medium">{o.equipamentos}</span>
                    <span className="text-muted-foreground">equipamentos</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
