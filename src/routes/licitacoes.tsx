import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { licitacoes, pipelineFunil, type LicitacaoStatus } from "@/lib/erp-data";
import { Plus, Gavel, Building2, Calendar, FileCheck2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/licitacoes")({
  head: () => ({
    meta: [
      { title: "Licitações — Vetor ERP" },
      { name: "description", content: "Pipeline de editais e propostas." },
    ],
  }),
  component: LicitacoesPage,
});

function fmt(v: number) {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}k`;
  return `R$ ${v}`;
}

const statusMap: Record<LicitacaoStatus, { variant: "success" | "warning" | "destructive" | "muted" | "primary"; label: string }> = {
  monitorando: { variant: "muted", label: "Monitorando" },
  preparando: { variant: "warning", label: "Preparando" },
  enviada: { variant: "primary", label: "Enviada" },
  habilitada: { variant: "primary", label: "Habilitada" },
  vencida: { variant: "success", label: "Vencida" },
  perdida: { variant: "destructive", label: "Perdida" },
};

function LicitacoesPage() {
  const totalEstimado = licitacoes.reduce((a, l) => a + l.valorEstimado, 0);
  const ganhasMes = licitacoes.filter((l) => l.status === "vencida").length;
  const emAndamento = licitacoes.filter((l) => ["preparando", "enviada", "habilitada"].includes(l.status)).length;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        <PageHeader
          title="Licitações"
          subtitle="Pipeline de editais públicos, propostas em preparação e resultados."
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Cadastrar Edital
            </button>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Editais em Análise", value: licitacoes.length, icon: Gavel },
            { label: "Em Andamento", value: emAndamento, icon: FileCheck2 },
            { label: "Vencidas no Mês", value: ganhasMes, icon: TrendingUp, color: "text-success" },
            { label: "Valor Estimado Total", value: fmt(totalEstimado), icon: Building2, big: true },
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

        {/* Pipeline funil */}
        <div className="bg-card border border-border rounded-md p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pipeline Comercial</div>
              <div className="text-sm font-semibold mt-1">Funil de oportunidades por etapa</div>
            </div>
          </div>
          <div className="space-y-3">
            {pipelineFunil.map((f) => {
              const max = Math.max(...pipelineFunil.map((x) => x.valor));
              const w = (f.valor / max) * 100;
              return (
                <div key={f.etapa} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-32 sm:w-40 text-xs font-medium truncate">{f.etapa}</div>
                  <div className="flex-1 h-7 bg-accent/50 rounded-sm relative overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-end px-3"
                      style={{ width: `${w}%` }}
                    >
                      <span className="text-[10px] font-mono font-bold text-primary-foreground">{fmt(f.valor)}</span>
                    </div>
                  </div>
                  <div className="w-10 text-right text-xs font-mono text-muted-foreground">{f.quantidade}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lista de editais */}
        <div className="space-y-3">
          {licitacoes.map((l) => {
            const s = statusMap[l.status];
            return (
              <div key={l.id} className="bg-card border border-border rounded-md p-4 sm:p-5 hover:border-primary/40 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {l.numero}
                      </span>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">{l.modalidade}</span>
                      <span className="text-[10px] font-mono uppercase text-muted-foreground">· {l.uf}</span>
                      <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
                    </div>
                    <div className="text-sm font-semibold leading-snug">{l.objeto}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Building2 className="size-3" /> {l.orgao}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-[11px]">
                      <div>
                        <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Valor Estimado</div>
                        <div className="font-mono font-semibold">{fmt(l.valorEstimado)}</div>
                      </div>
                      {l.valorProposta && (
                        <div>
                          <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Nossa Proposta</div>
                          <div className="font-mono font-semibold text-primary">{fmt(l.valorProposta)}</div>
                        </div>
                      )}
                      <div>
                        <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Responsável</div>
                        <div className="font-medium">{l.responsavel}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground uppercase tracking-wider text-[9px]">Documentos</div>
                        <div className="font-medium">{l.documentos} anexos</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-48 lg:border-l lg:border-border lg:pl-5 flex lg:flex-col gap-4 lg:gap-3 justify-between">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3" /> Abertura
                      </div>
                      <div className="text-sm font-semibold mt-0.5">{l.abertura}</div>
                      <div className="text-[10px] text-muted-foreground">{l.prazoEntrega}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Probabilidade</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-accent rounded-full overflow-hidden">
                          <div
                            className={`h-full ${l.probabilidade >= 70 ? "bg-success" : l.probabilidade >= 40 ? "bg-warning" : "bg-destructive"}`}
                            style={{ width: `${l.probabilidade}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold">{l.probabilidade}%</span>
                      </div>
                    </div>
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
