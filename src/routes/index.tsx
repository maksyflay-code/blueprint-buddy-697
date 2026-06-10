import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AppLayout, StatusBadge } from "@/components/AppLayout";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { FunnelChartCustom } from "@/components/charts/FunnelChart";
import { UtilizationDonut } from "@/components/charts/UtilizationDonut";
import {
  kpis,
  kpisExecutivo,
  obras,
  licitacoes,
  solicitacoes,
  equipamentos,
  pipelineFunil,
  utilizacaoPorCategoria,
} from "@/lib/erp-data";
import {
  ArrowUpRight,
  Plus,
  TrendingUp,
  AlertTriangle,
  Gavel,
  HardHat,
  Truck,
  Banknote,
  UserCog,
  Building2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vetor ERP — Painel Executivo" },
      { name: "description", content: "Visão consolidada de licitações, obras, locação e financeiro." },
    ],
  }),
  component: Dashboard,
});

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
function fmtM(v: number) {
  if (v >= 1_000_000) return `R$ ${(v / 1_000_000).toFixed(2).replace(".", ",")}M`;
  if (v >= 1_000) return `R$ ${(v / 1_000).toFixed(0)}k`;
  return `R$ ${v}`;
}

function Dashboard() {
  const receitaTotal = kpisExecutivo.receitaLocacao + kpisExecutivo.receitaObras;
  const receitaData = [
    { mes: "Jul", locacao: 198, obras: 1420 },
    { mes: "Ago", locacao: 215, obras: 1580 },
    { mes: "Set", locacao: 240, obras: 1720 },
    { mes: "Out", locacao: 232, obras: 1810 },
    { mes: "Nov", locacao: 253, obras: 1690 },
    { mes: "Dez", locacao: 284, obras: 1840 },
  ];
  const utilData = utilizacaoPorCategoria.map((c, i) => ({
    name: c.categoria,
    value: c.total,
    color: [
      "oklch(0.68 0.18 45)",
      "oklch(0.75 0.14 45)",
      "oklch(0.7 0.16 155)",
      "oklch(0.82 0.1 45)",
      "oklch(0.82 0.1 155)",
    ][i % 5],
  }));
  const utilMedia = Math.round(
    utilizacaoPorCategoria.reduce((a, c) => a + c.percentual, 0) / utilizacaoPorCategoria.length
  );
  const obrasAtivas = obras.filter((o) => o.status === "execucao");
  const licitacoesProximas = licitacoes
    .filter((l) => ["monitorando", "preparando", "enviada"].includes(l.status))
    .slice(0, 4);
  const pendentes = solicitacoes.filter((s) => s.status === "pendente").slice(0, 3);
  const frotaAlugada = equipamentos.filter((e) => e.status === "alugado").length;
  const frotaManut = equipamentos.filter((e) => e.status === "manutencao").length;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
              Direção / Painel Executivo Consolidado
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Bom dia, Ricardo</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {kpisExecutivo.obrasAtivas} obras ativas · {kpisExecutivo.licitacoesAbertas} editais em pipeline · {kpis.solicitacoesPendentes} aprovações pendentes.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="inline-flex items-center gap-2 border border-border bg-card px-3 py-2 rounded-md text-xs font-medium hover:bg-accent">
              <Gavel className="size-3.5" /> Novo Edital
            </button>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 shadow-sm">
              <Plus className="size-4" /> Nova Locação
            </button>
          </div>
        </div>

        {/* Top KPIs - Visão Diretor */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Receita Consolidada",
              value: fmtM(receitaTotal),
              sub: `Locação ${fmtM(kpisExecutivo.receitaLocacao)} + Obras ${fmtM(kpisExecutivo.receitaObras)}`,
              icon: TrendingUp,
              color: "text-success",
            },
            {
              label: "Carteira de Obras",
              value: fmtM(kpisExecutivo.obrasValor),
              sub: `${kpisExecutivo.obrasAtivas} obras em execução`,
              icon: HardHat,
            },
            {
              label: "Pipeline Licitações",
              value: fmtM(kpisExecutivo.licitacoesValor),
              sub: `${kpisExecutivo.licitacoesAbertas} editais · taxa ${kpisExecutivo.taxaSucesso}%`,
              icon: Gavel,
            },
            {
              label: "Margem Bruta",
              value: `${kpisExecutivo.margemBruta}%`,
              sub: `A receber ${fmtM(kpisExecutivo.contasReceber)}`,
              icon: Banknote,
            },
          ].map((k, i) => (
            <div
              key={k.label}
              className="bg-card p-4 sm:p-5 border border-border rounded-md animate-in-up"
              style={{ animationDelay: `${50 + i * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                  {k.label}
                </div>
                <k.icon className="size-3.5 text-muted-foreground" />
              </div>
              <div className={`text-xl sm:text-2xl font-bold tracking-tight ${k.color ?? ""}`}>{k.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1.5 leading-tight">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Secondary KPIs - Operacionais */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Frota Alugada", value: frotaAlugada, total: equipamentos.length, to: "/equipamentos", icon: Truck },
            { label: "Em Manutenção", value: frotaManut, color: "text-warning-foreground", to: "/manutencao" },
            { label: "Locações Ativas", value: kpis.locacoesAtivas, to: "/locacoes" },
            { label: "Colaboradores", value: kpisExecutivo.colaboradores, to: "/equipe", icon: UserCog },
            { label: "ASO Vencendo", value: kpisExecutivo.asoVencendo, color: "text-destructive", to: "/equipe" },
          ].map((k) => (
            <Link
              key={k.label}
              to={k.to}
              className="bg-card border border-border rounded-md p-3 hover:border-primary/40 transition-colors"
            >
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                {k.label}
              </div>
              <div className={`text-lg font-bold tracking-tight mt-1 ${k.color ?? ""}`}>
                {k.value}
                {k.total && <span className="text-xs text-muted-foreground font-normal">/{k.total}</span>}
              </div>
            </Link>
          ))}
        </div>

        {/* Receita + Funil + Utilização */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div
            className="lg:col-span-2 bg-card border border-border rounded-md p-4 sm:p-6 animate-in-up"
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Receita Consolidada — 6 meses
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold tracking-tight">{fmtM(receitaTotal)}</span>
                  <span className="text-xs text-success font-medium flex items-center gap-1">
                    <TrendingUp className="size-3" /> +12.4%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase">
                  <span className="size-2 rounded-sm bg-primary" />
                  <span className="text-muted-foreground">Locação</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase">
                  <span className="size-2 rounded-sm bg-success" />
                  <span className="text-muted-foreground">Obras</span>
                </div>
                <div className="flex gap-1 text-[10px] font-mono">
                  <span className="px-2 py-1 bg-accent rounded uppercase">6M</span>
                  <span className="px-2 py-1 text-muted-foreground uppercase">1A</span>
                </div>
              </div>
            </div>
            <RevenueChart data={receitaData} />
          </div>

          <div
            className="bg-card border border-border rounded-md p-4 sm:p-6 animate-in-up"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Utilização da Frota
                </div>
                <div className="text-xs text-muted-foreground mt-1">{equipamentos.length} máquinas no parque</div>
              </div>
              <Link to="/equipamentos" className="text-[10px] text-primary font-bold uppercase flex items-center gap-1">
                Ver <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <UtilizationDonut data={utilData} centerLabel="Média" centerValue={`${utilMedia}%`} />
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              {utilData.slice(0, 4).map((u) => (
                <div key={u.name} className="flex items-center gap-1.5 text-[10px]">
                  <span className="size-2 rounded-sm shrink-0" style={{ background: u.color }} />
                  <span className="truncate text-muted-foreground">{u.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Funil de Licitações - linha dedicada */}
        <div
          className="bg-card border border-border rounded-md p-4 sm:p-6 animate-in-up"
          style={{ animationDelay: "350ms" }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Funil de Licitações
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {kpisExecutivo.licitacoesAbertas} editais ativos · taxa de sucesso {kpisExecutivo.taxaSucesso}%
              </div>
            </div>
            <Link to="/licitacoes" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              Pipeline completo <ArrowUpRight className="size-3" />
            </Link>
          </div>
          <FunnelChartCustom data={pipelineFunil} />
        </div>


        {/* Obras + Aprovações */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Obras em Execução
              </h2>
              <Link to="/obras" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                Ver Todas <ArrowUpRight className="size-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {obrasAtivas.slice(0, 4).map((o, i) => (
                <div
                  key={o.id}
                  className="bg-card border border-border rounded-md p-4 animate-in-up hover:border-primary/40 transition-colors"
                  style={{ animationDelay: `${350 + i * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          {o.codigo}
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase">{o.cidade}, {o.uf}</span>
                      </div>
                      <div className="text-sm font-semibold mt-1 truncate">{o.nome}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Building2 className="size-3" /> {o.contratante}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Contrato</div>
                      <div className="font-mono font-bold text-sm">{fmtM(o.valorContrato)}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-muted-foreground uppercase tracking-wider">Físico</span>
                        <span className="font-mono font-bold">{o.fisico}%</span>
                      </div>
                      <div className="h-1 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: `${o.fisico}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-muted-foreground uppercase tracking-wider">Financeiro</span>
                        <span className="font-mono font-bold">{o.financeiro}%</span>
                      </div>
                      <div className="h-1 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${o.financeiro}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximas licitações + aprovações */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Próximas Aberturas
                </h2>
                <Link to="/licitacoes" className="text-[10px] text-primary font-bold uppercase">
                  Ver
                </Link>
              </div>
              <div className="space-y-2">
                {licitacoesProximas.map((l) => (
                  <div key={l.id} className="bg-card border border-border rounded-md p-3 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-primary truncate">{l.numero}</span>
                      <span className="text-[10px] font-mono text-muted-foreground shrink-0">{l.uf}</span>
                    </div>
                    <div className="text-xs font-medium leading-tight line-clamp-2">{l.objeto}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-muted-foreground">{l.prazoEntrega}</span>
                      <span className="text-[10px] font-mono font-bold">{fmtM(l.valorEstimado)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                  Aprovações Pendentes
                </h2>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 font-bold rounded">
                  {pendentes.length}
                </span>
              </div>
              <div className="space-y-2">
                {pendentes.map((r) => (
                  <div key={r.id} className="bg-card p-3 border border-border rounded-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-primary">#{r.numero}</span>
                      <StatusBadge variant={r.prioridade === "alta" ? "destructive" : "muted"}>
                        {r.prioridade}
                      </StatusBadge>
                    </div>
                    <div className="text-xs font-medium leading-snug line-clamp-2">{r.titulo}</div>
                    <div className="flex gap-1.5">
                      <button className="flex-1 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded uppercase hover:bg-primary/90">
                        Aprovar
                      </button>
                      <button className="px-2 py-1 border border-border text-[10px] font-bold rounded uppercase text-muted-foreground hover:bg-accent">
                        Negar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alert strip */}
        <div className="bg-warning/10 border border-warning/30 rounded-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 animate-in-up" style={{ animationDelay: "750ms" }}>
          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            <AlertTriangle className="size-5 text-warning shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">1 obra paralisada e 3 manutenções críticas</div>
              <div className="text-xs text-muted-foreground">
                Asfaltamento Av. Brasil aguarda liberação ambiental · revisar plano de ação.
              </div>
            </div>
          </div>
          <Link
            to="/obras"
            className="text-xs font-bold uppercase tracking-wider px-3 py-2 border border-warning/40 rounded hover:bg-warning/20 transition-colors text-center shrink-0"
          >
            Ver Obras
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
