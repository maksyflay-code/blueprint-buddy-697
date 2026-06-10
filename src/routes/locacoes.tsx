import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { locacoes } from "@/lib/erp-data";
import { Plus, Download } from "lucide-react";

export const Route = createFileRoute("/locacoes")({
  head: () => ({ meta: [{ title: "Locações — Vetor ERP" }] }),
  component: LocacoesPage,
});

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function LocacoesPage() {
  const total = locacoes.reduce((s, l) => s + l.valor, 0);
  const vigentes = locacoes.filter((l) => l.status === "vigente").length;

  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        <PageHeader
          title="Locações"
          subtitle={`${locacoes.length} contratos · ${vigentes} vigentes · ${fmtBRL(total)} em valor de carteira`}
          actions={
            <>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent transition-colors">
                <Download className="size-4" /> Exportar
              </button>
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                <Plus className="size-4" /> Nova Locação
              </button>
            </>
          }
        />

        <div className="bg-card border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-accent/30 border-b border-border">
                <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-6 py-3">Contrato</th>
                  <th className="px-6 py-3">Cliente</th>
                  <th className="px-6 py-3">Obra</th>
                  <th className="px-6 py-3">Equipamento</th>
                  <th className="px-6 py-3">Período</th>
                  <th className="px-6 py-3 text-right">Valor</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {locacoes.map((l, i) => {
                  const badge =
                    l.status === "vigente"
                      ? { variant: "success" as const, label: "Vigente" }
                      : l.status === "pendente_assinatura"
                      ? { variant: "warning" as const, label: "Pendente" }
                      : l.status === "atrasado"
                      ? { variant: "destructive" as const, label: "Atrasado" }
                      : { variant: "muted" as const, label: "Encerrado" };
                  return (
                    <tr
                      key={l.contrato}
                      className="border-t border-border/60 hover:bg-accent/30 transition-colors animate-in-up"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <td className="px-6 py-4 font-mono font-medium">#{l.contrato}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium">{l.cliente}</div>
                        <div className="text-[10px] font-mono text-muted-foreground">{l.cnpj}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{l.obra}</td>
                      <td className="px-6 py-4">{l.equipamento}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {l.inicio} → {l.fim}
                      </td>
                      <td className="px-6 py-4 text-right font-medium font-mono">{fmtBRL(l.valor)}</td>
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
      </div>
    </AppLayout>
  );
}
