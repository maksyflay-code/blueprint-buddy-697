import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { compras } from "@/lib/erp-data";
import { Plus, ShoppingCart, Truck, ClipboardCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/compras")({
  head: () => ({
    meta: [
      { title: "Compras / Suprimentos — Vetor ERP" },
      { name: "description", content: "Cotações, ordens de compra e fornecedores." },
    ],
  }),
  component: ComprasPage,
});

const statusMap = {
  cotacao: { variant: "muted" as const, label: "Em Cotação" },
  aprovacao: { variant: "warning" as const, label: "Aguarda Aprovação" },
  emitida: { variant: "primary" as const, label: "Emitida" },
  recebida: { variant: "success" as const, label: "Recebida" },
  atrasada: { variant: "destructive" as const, label: "Atrasada" },
};

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function ComprasPage() {
  const totalMes = compras.reduce((a, c) => a + c.valor, 0);
  const emCotacao = compras.filter((c) => c.status === "cotacao").length;
  const atrasadas = compras.filter((c) => c.status === "atrasada").length;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        <PageHeader
          title="Compras / Suprimentos"
          subtitle="Cotações, ordens de compra, fornecedores e materiais por obra."
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Nova Requisição
            </button>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Total Comprometido (mês)", value: fmtBRL(totalMes), icon: ShoppingCart, big: true },
            { label: "Em Cotação", value: emCotacao, icon: ClipboardCheck },
            { label: "Ordens Atrasadas", value: atrasadas, icon: AlertTriangle, color: "text-destructive" },
            { label: "Entregas da Semana", value: 4, icon: Truck },
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

        <div className="bg-card border border-border rounded-md overflow-hidden">
          <div className="p-4 border-b border-border bg-accent/30">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Ordens de Compra & Cotações
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-accent/20">
                <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3">Nº</th>
                  <th className="px-4 py-3">Fornecedor</th>
                  <th className="px-4 py-3">Itens</th>
                  <th className="px-4 py-3">Obra</th>
                  <th className="px-4 py-3">Entrega</th>
                  <th className="px-4 py-3 text-right">Valor</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((c) => (
                  <tr key={c.id} className="border-t border-border/60 hover:bg-accent/20">
                    <td className="px-4 py-3 font-mono font-medium">{c.numero}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{c.fornecedor}</div>
                      <div className="text-[10px] text-muted-foreground">por {c.comprador}</div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <div className="truncate">{c.itens}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-[11px]">{c.obra}</td>
                    <td className="px-4 py-3 font-mono text-[11px]">
                      <div>{c.entregaPrevista}</div>
                      <div className="text-muted-foreground">emit. {c.emissao}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">{fmtBRL(c.valor)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge variant={statusMap[c.status].variant}>{statusMap[c.status].label}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
