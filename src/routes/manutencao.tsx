import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { manutencoes } from "@/lib/erp-data";
import { Plus, Wrench, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/manutencao")({
  head: () => ({ meta: [{ title: "Manutenção — Vetor ERP" }] }),
  component: ManutencaoPage,
});

const statusMap = {
  agendada: { variant: "primary" as const, label: "Agendada", icon: Clock },
  em_execucao: { variant: "warning" as const, label: "Em Execução", icon: Wrench },
  concluida: { variant: "success" as const, label: "Concluída", icon: CheckCircle2 },
  atrasada: { variant: "destructive" as const, label: "Atrasada", icon: AlertTriangle },
};

function ManutencaoPage() {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Manutenção"
          subtitle={`${manutencoes.length} ordens · 3 críticas requerem atenção`}
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Nova Ordem
            </button>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {(["em_execucao", "agendada", "concluida", "atrasada"] as const).map((st) => {
            const c = manutencoes.filter((m) => m.status === st).length;
            const cfg = statusMap[st];
            const Icon = cfg.icon;
            return (
              <div key={st} className="bg-card border border-border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {cfg.label}
                  </div>
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold tracking-tight mt-2">
                  {String(c).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          {manutencoes.map((m, i) => {
            const cfg = statusMap[m.status];
            const Icon = cfg.icon;
            return (
              <div
                key={m.id}
                className="bg-card border border-border rounded-md p-4 sm:p-5 flex flex-wrap items-center gap-4 sm:gap-6 animate-in-up hover:border-primary/40 transition-colors"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  className={`size-12 rounded-md grid place-items-center shrink-0 ${
                    m.status === "atrasada"
                      ? "bg-destructive/15 text-destructive"
                      : m.status === "em_execucao"
                      ? "bg-warning/20 text-warning-foreground"
                      : m.status === "concluida"
                      ? "bg-success/15 text-success"
                      : "bg-primary/15 text-primary"
                  }`}
                >
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-[180px]">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {m.tipo}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">#{m.codigo}</span>
                    {m.prioridade === "alta" && (
                      <StatusBadge variant="destructive">Alta Prioridade</StatusBadge>
                    )}
                  </div>
                  <div className="font-semibold text-sm">{m.equipamento}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Responsável: <strong className="text-foreground">{m.responsavel}</strong>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Data
                  </div>
                  <div className="text-sm font-semibold font-mono">{m.data}</div>
                </div>
                <StatusBadge variant={cfg.variant}>{cfg.label}</StatusBadge>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
