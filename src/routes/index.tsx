import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, StatusBadge } from "@/components/AppLayout";
import {
  equipamentos,
  solicitacoes,
  locacoes,
  kpis,
  receitaSerie,
  utilizacaoPorCategoria,
} from "@/lib/erp-data";
import { ArrowUpRight, Plus, Paperclip, TrendingUp, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vetor ERP — Painel de Controle" },
      { name: "description", content: "Painel operacional para locação de equipamentos de engenharia." },
    ],
  }),
  component: Dashboard,
});

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

const statusToBadge: Record<string, { variant: "success" | "warning" | "destructive" | "muted" | "primary"; label: string }> = {
  alugado: { variant: "success", label: "Alugado" },
  disponivel: { variant: "primary", label: "Disponível" },
  manutencao: { variant: "warning", label: "Oficina" },
  transito: { variant: "muted", label: "Em Trânsito" },
};

function Dashboard() {
  const maxReceita = Math.max(...receitaSerie.map((r) => r.valor));

  return (
    <AppLayout>
      <div className="p-8 space-y-8">
        {/* Header row */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Operação / Painel de Controle
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Bom dia, Ricardo</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {kpis.devolucoesHoje} devoluções previstas hoje · {kpis.solicitacoesPendentes} solicitações aguardando.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
            <Plus className="size-4" />
            Nova Locação
          </button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Receita Mensal", value: fmtBRL(kpis.receitaMensal), delta: `+${kpis.receitaDelta}% vs mês anterior`, deltaColor: "text-success", delay: 50 },
            { label: "Taxa de Utilização", value: `${kpis.utilizacao}%`, bar: kpis.utilizacao, delay: 100 },
            { label: "Locações Ativas", value: `${kpis.locacoesAtivas}`, suffix: "máquinas", footer: `${kpis.devolucoesHoje} devoluções hoje`, delay: 150 },
            { label: "Em Manutenção", value: `0${kpis.emManutencao}`, valueColor: "text-destructive", footer: `${kpis.criticos} em caráter crítico`, footerColor: "text-warning-foreground", delay: 200 },
          ].map((k) => (
            <div
              key={k.label}
              className="bg-card p-5 border border-border rounded-md animate-in-up"
              style={{ animationDelay: `${k.delay}ms` }}
            >
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter mb-2">
                {k.label}
              </div>
              <div className={`text-2xl font-bold tracking-tight ${k.valueColor ?? ""}`}>
                {k.value}{" "}
                {k.suffix && <span className="text-sm text-muted-foreground font-normal">{k.suffix}</span>}
              </div>
              {k.delta && <div className={`text-[10px] font-medium mt-2 ${k.deltaColor}`}>{k.delta}</div>}
              {k.bar !== undefined && (
                <div className="w-full bg-accent h-1 mt-3 overflow-hidden rounded-full">
                  <div className="bg-primary h-full" style={{ width: `${k.bar}%` }} />
                </div>
              )}
              {k.footer && <div className={`text-[10px] mt-2 font-medium ${k.footerColor ?? "text-muted-foreground"}`}>{k.footer}</div>}
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-card border border-border rounded-md p-6 animate-in-up" style={{ animationDelay: "250ms" }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Receita — 6 meses</div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold tracking-tight">{fmtBRL(kpis.receitaMensal)}</span>
                  <span className="text-xs text-success font-medium flex items-center gap-1">
                    <TrendingUp className="size-3" /> +12.4%
                  </span>
                </div>
              </div>
              <div className="flex gap-1 text-[10px] font-mono">
                <span className="px-2 py-1 bg-accent rounded uppercase">6M</span>
                <span className="px-2 py-1 text-muted-foreground uppercase">1A</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-40">
              {receitaSerie.map((r) => (
                <div key={r.mes} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-accent/40 rounded-sm relative flex-1 flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-primary/70 rounded-sm transition-all"
                      style={{ height: `${(r.valor / maxReceita) * 100}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">{r.mes}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-md p-6 animate-in-up" style={{ animationDelay: "300ms" }}>
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Utilização por Categoria
            </div>
            <div className="space-y-4">
              {utilizacaoPorCategoria.map((c) => (
                <div key={c.categoria}>
                  <div className="flex justify-between items-baseline text-xs mb-1.5">
                    <span className="font-medium truncate">{c.categoria}</span>
                    <span className="font-mono text-muted-foreground">{c.percentual}%</span>
                  </div>
                  <div className="h-1 bg-accent rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.percentual >= 85 ? "bg-success" : c.percentual >= 70 ? "bg-primary" : "bg-warning"}`}
                      style={{ width: `${c.percentual}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fleet + Requests */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Status da Frota
              </h2>
              <a className="text-xs font-medium text-primary hover:underline flex items-center gap-1" href="/equipamentos">
                Ver Todos <ArrowUpRight className="size-3" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {equipamentos.slice(0, 4).map((e, i) => {
                const s = statusToBadge[e.status];
                return (
                  <div
                    key={e.id}
                    className="bg-card border border-border rounded-md overflow-hidden flex animate-in-up hover:border-primary/40 transition-colors"
                    style={{ animationDelay: `${350 + i * 50}ms` }}
                  >
                    <div className="w-32 bg-accent grid place-items-center border-r border-border shrink-0">
                      <img
                        src={e.imagem}
                        alt={e.nome}
                        loading="lazy"
                        width={128}
                        height={128}
                        className="object-contain max-h-32 p-2"
                      />
                    </div>
                    <div className="p-4 flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{e.nome}</div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase mt-0.5">
                            #{e.codigo}
                          </div>
                        </div>
                        <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <span className="text-muted-foreground block uppercase tracking-wider">
                            {e.cliente ? "Cliente" : "Local"}
                          </span>
                          <span className="font-medium truncate block">{e.cliente ?? e.local}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block uppercase tracking-wider">
                            Próx. Manut.
                          </span>
                          <span className="font-medium">{e.proxManutencao}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Solicitações Internas
              </h2>
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-bold rounded">
                {kpis.solicitacoesPendentes} NOVAS
              </span>
            </div>

            {solicitacoes.slice(0, 2).map((r, i) => (
              <div
                key={r.id}
                className="bg-card p-4 border border-border rounded-md space-y-3 animate-in-up shadow-sm"
                style={{ animationDelay: `${550 + i * 50}ms` }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">
                    #{r.numero}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">{r.tempo}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {r.tipo}
                </div>
                <div className="text-xs font-semibold leading-snug">{r.titulo}</div>
                <div className="text-[10px] text-muted-foreground">
                  Por <strong className="text-foreground">{r.solicitante}</strong> · {r.setor}
                </div>
                {r.anexos.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {r.anexos.map((a) => (
                      <div
                        key={a.nome}
                        className="flex items-center gap-1 bg-accent px-2 py-1 rounded text-[9px] font-medium border border-border/50"
                      >
                        <Paperclip className="size-2.5" />
                        {a.nome}
                      </div>
                    ))}
                  </div>
                )}
                {r.status === "pendente" && (
                  <div className="flex gap-2 pt-1">
                    <button className="flex-1 py-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase tracking-wider hover:bg-primary/90 transition-colors">
                      Aprovar
                    </button>
                    <button className="px-3 py-1.5 border border-border text-[10px] font-bold rounded uppercase text-muted-foreground hover:bg-accent transition-colors">
                      Negar
                    </button>
                  </div>
                )}
              </div>
            ))}

            <a
              href="/solicitacoes"
              className="block text-center text-xs text-muted-foreground hover:text-foreground py-2 border border-dashed border-border rounded-md transition-colors"
            >
              Ver todas as solicitações →
            </a>
          </div>
        </div>

        {/* Active Rentals Table */}
        <div className="bg-card border border-border rounded-md overflow-hidden animate-in-up" style={{ animationDelay: "700ms" }}>
          <div className="p-4 border-b border-border bg-accent/30 flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Últimas Locações Registradas
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2 bg-success rounded-full pulse-dot" />
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Tempo Real</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-accent/20">
                <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-3">Contrato</th>
                  <th className="px-6 py-3">Equipamento</th>
                  <th className="px-6 py-3">Cliente / Obra</th>
                  <th className="px-6 py-3">Período</th>
                  <th className="px-6 py-3 text-right">Valor Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {locacoes.slice(0, 5).map((l) => {
                  const badge =
                    l.status === "vigente"
                      ? { variant: "success" as const, label: "Vigente" }
                      : l.status === "pendente_assinatura"
                      ? { variant: "warning" as const, label: "Pend. Assinatura" }
                      : l.status === "atrasado"
                      ? { variant: "destructive" as const, label: "Atrasado" }
                      : { variant: "muted" as const, label: "Encerrado" };
                  return (
                    <tr key={l.contrato} className="border-t border-border/60 hover:bg-accent/20 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium">#{l.contrato}</td>
                      <td className="px-6 py-4">{l.equipamento}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{l.cliente}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">{l.obra}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {l.inicio} → {l.fim}
                      </td>
                      <td className="px-6 py-4 text-right font-medium">{fmtBRL(l.valor)}</td>
                      <td className="px-6 py-4">
                        <StatusBadge variant={badge.variant}>{badge.label}</StatusBadge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alert strip */}
        <div className="bg-warning/10 border border-warning/30 rounded-md p-4 flex items-center gap-4 animate-in-up" style={{ animationDelay: "750ms" }}>
          <AlertTriangle className="size-5 text-warning shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold">3 manutenções críticas requerem atenção</div>
            <div className="text-xs text-muted-foreground">
              Equipamentos com paradas não programadas afetando contratos vigentes.
            </div>
          </div>
          <a
            href="/manutencao"
            className="text-xs font-bold uppercase tracking-wider px-3 py-2 border border-warning/40 rounded hover:bg-warning/20 transition-colors"
          >
            Ver Manutenções
          </a>
        </div>
      </div>
    </AppLayout>
  );
}
