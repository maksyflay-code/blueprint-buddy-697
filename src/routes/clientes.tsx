import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { clientes } from "@/lib/erp-data";
import { Plus, MapPin, FileText } from "lucide-react";

export const Route = createFileRoute("/clientes")({
  head: () => ({ meta: [{ title: "Clientes — Vetor ERP" }] }),
  component: ClientesPage,
});

function fmtBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function ClientesPage() {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Clientes"
          subtitle={`${clientes.length} clientes cadastrados na base`}
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Novo Cliente
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientes.map((c, i) => {
            const sb =
              c.status === "ativo"
                ? { variant: "success" as const, label: "Ativo" }
                : c.status === "inadimplente"
                ? { variant: "destructive" as const, label: "Inadimplente" }
                : { variant: "muted" as const, label: "Prospect" };
            const initials = c.nome
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <div
                key={c.id}
                className="bg-card border border-border rounded-md p-5 animate-in-up hover:border-primary/40 hover:shadow-lg transition-all"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="size-12 rounded-md bg-gradient-to-br from-primary/30 to-primary grid place-items-center text-primary-foreground font-bold text-sm">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm">{c.nome}</div>
                    <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{c.cnpj}</div>
                  </div>
                  <StatusBadge variant={sb.variant}>{sb.label}</StatusBadge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <MapPin className="size-3" />
                  {c.cidade}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Contratos
                    </div>
                    <div className="text-lg font-bold flex items-center gap-1.5">
                      <FileText className="size-4 text-muted-foreground" />
                      {c.contratosAtivos}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Total Faturado
                    </div>
                    <div className="text-lg font-bold font-mono">{fmtBRL(c.valorTotal)}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground">
                  Última interação: <strong className="text-foreground">{c.ultimaInteracao}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
