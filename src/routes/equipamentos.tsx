import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { equipamentos } from "@/lib/erp-data";
import { Plus, Filter, Gauge, Wrench, Calendar } from "lucide-react";

export const Route = createFileRoute("/equipamentos")({
  head: () => ({ meta: [{ title: "Equipamentos — Vetor ERP" }] }),
  component: EquipamentosPage,
});

const statusToBadge = {
  alugado: { variant: "success" as const, label: "Alugado" },
  disponivel: { variant: "primary" as const, label: "Disponível" },
  manutencao: { variant: "warning" as const, label: "Oficina" },
  transito: { variant: "muted" as const, label: "Em Trânsito" },
};

function EquipamentosPage() {
  const counts = equipamentos.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Equipamentos"
          subtitle={`${equipamentos.length} máquinas cadastradas na frota`}
          actions={
            <>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent transition-colors">
                <Filter className="size-4" />
                Filtros
              </button>
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                <Plus className="size-4" />
                Cadastrar
              </button>
            </>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Alugados", value: counts.alugado ?? 0, color: "text-success" },
            { label: "Disponíveis", value: counts.disponivel ?? 0, color: "text-primary" },
            { label: "Em Oficina", value: counts.manutencao ?? 0, color: "text-warning-foreground" },
            { label: "Em Trânsito", value: counts.transito ?? 0, color: "text-muted-foreground" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-md p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
              <div className={`text-3xl font-bold tracking-tight mt-2 ${s.color}`}>
                {String(s.value).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {equipamentos.map((e, i) => {
            const s = statusToBadge[e.status];
            return (
              <div
                key={e.id}
                className="bg-card border border-border rounded-md overflow-hidden animate-in-up hover:border-primary/40 hover:shadow-lg transition-all"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="aspect-square bg-accent grid place-items-center border-b border-border relative">
                  <img
                    src={e.imagem}
                    alt={e.nome}
                    loading="lazy"
                    width={300}
                    height={300}
                    className="object-contain max-h-full p-4"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge variant={s.variant}>{s.label}</StatusBadge>
                  </div>
                  <div className="absolute top-3 right-3 text-[9px] font-mono bg-background/80 backdrop-blur px-1.5 py-0.5 rounded border border-border">
                    #{e.codigo}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-sm font-bold leading-snug">{e.nome}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      {e.categoria}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] pt-3 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="size-3 text-muted-foreground" />
                      <span className="font-mono">{e.horimetro.toLocaleString("pt-BR")}h</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3 text-muted-foreground" />
                      <span>{e.proxManutencao}</span>
                    </div>
                  </div>
                  {(e.cliente || e.local) && (
                    <div className="text-[10px] text-muted-foreground border-t border-border pt-3">
                      <div className="uppercase tracking-wider">{e.cliente ? "Locado para" : "Local"}</div>
                      <div className="font-medium text-foreground truncate">{e.cliente ?? e.local}</div>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-[10px] text-muted-foreground uppercase">Diária</span>
                    <span className="text-sm font-bold font-mono">
                      {e.diaria.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                    </span>
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
