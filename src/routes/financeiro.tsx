import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { receitaSerie, kpis, locacoes } from "@/lib/erp-data";
import { TrendingUp, TrendingDown, Download, Receipt, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/financeiro")({
  head: () => ({ meta: [{ title: "Financeiro — Vetor ERP" }] }),
  component: FinanceiroPage,
});

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function FinanceiroPage() {
  const maxReceita = Math.max(...receitaSerie.map((r) => r.valor));
  const aReceber = locacoes.filter((l) => l.status === "vigente").reduce((s, l) => s + l.valor, 0);
  const atrasado = locacoes.filter((l) => l.status === "atrasado").reduce((s, l) => s + l.valor, 0);

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        <PageHeader
          title="Financeiro"
          subtitle="Receita, faturamento e contas a receber"
          actions={
            <button className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent transition-colors">
              <Download className="size-4" /> Exportar DRE
            </button>
          }
        />

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-md p-5 animate-in-up">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Receita Mensal
              </span>
              <Receipt className="size-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold tracking-tight mt-2">{fmtBRL(kpis.receitaMensal)}</div>
            <div className="text-[10px] text-success font-medium mt-2 flex items-center gap-1">
              <TrendingUp className="size-3" /> +{kpis.receitaDelta}% vs mês anterior
            </div>
          </div>
          <div className="bg-card border border-border rounded-md p-5 animate-in-up" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                A Receber
              </span>
              <CheckCircle2 className="size-4 text-success" />
            </div>
            <div className="text-2xl font-bold tracking-tight mt-2 text-success">{fmtBRL(aReceber)}</div>
            <div className="text-[10px] text-muted-foreground mt-2">Contratos vigentes</div>
          </div>
          <div className="bg-card border border-border rounded-md p-5 animate-in-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Em Atraso
              </span>
              <AlertCircle className="size-4 text-destructive" />
            </div>
            <div className="text-2xl font-bold tracking-tight mt-2 text-destructive">
              {fmtBRL(atrasado)}
            </div>
            <div className="text-[10px] text-muted-foreground mt-2">1 cliente inadimplente</div>
          </div>
          <div className="bg-card border border-border rounded-md p-5 animate-in-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Margem Op.
              </span>
              <TrendingUp className="size-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold tracking-tight mt-2">34.2%</div>
            <div className="text-[10px] text-success font-medium mt-2 flex items-center gap-1">
              <TrendingUp className="size-3" /> +2.1pp
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-md p-6 animate-in-up" style={{ animationDelay: "200ms" }}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Evolução de Receita
              </h3>
              <div className="text-2xl font-bold tracking-tight mt-2">
                R$ 1.422K <span className="text-sm font-normal text-muted-foreground">acumulado 6M</span>
              </div>
            </div>
          </div>
          <div className="flex items-end gap-4 h-60">
            {receitaSerie.map((r) => (
              <div key={r.mes} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-[10px] font-mono font-bold">R$ {r.valor}K</div>
                <div className="w-full bg-accent/40 rounded-sm flex-1 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-sm"
                    style={{ height: `${(r.valor / maxReceita) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase">{r.mes}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-md overflow-hidden">
          <div className="p-4 border-b border-border bg-accent/30">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Recebíveis por Contrato
            </h3>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-accent/20">
              <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Contrato</th>
                <th className="px-6 py-3 text-left">Cliente</th>
                <th className="px-6 py-3 text-left">Vencimento</th>
                <th className="px-6 py-3 text-right">Valor</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {locacoes.slice(0, 6).map((l) => (
                <tr key={l.contrato} className="border-t border-border/60 hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium">#{l.contrato}</td>
                  <td className="px-6 py-4">{l.cliente}</td>
                  <td className="px-6 py-4 text-muted-foreground">{l.fim}</td>
                  <td className="px-6 py-4 text-right font-mono font-medium">{fmtBRL(l.valor)}</td>
                  <td className="px-6 py-4">
                    {l.status === "atrasado" ? (
                      <span className="text-destructive font-medium text-[10px] uppercase">Atrasado</span>
                    ) : l.status === "encerrado" ? (
                      <span className="text-success font-medium text-[10px] uppercase">Quitado</span>
                    ) : (
                      <span className="text-muted-foreground font-medium text-[10px] uppercase">A vencer</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
