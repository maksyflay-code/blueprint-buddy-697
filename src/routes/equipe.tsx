import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { equipe } from "@/lib/erp-data";
import { Plus, ShieldCheck, ShieldAlert, UserPlus } from "lucide-react";

export const Route = createFileRoute("/equipe")({
  head: () => ({
    meta: [
      { title: "Equipe / RH — Vetor ERP" },
      { name: "description", content: "Colaboradores, ASOs e treinamentos NR." },
    ],
  }),
  component: EquipePage,
});

function EquipePage() {
  const ativos = equipe.filter((c) => c.status === "ativo").length;
  const asoVencendo = equipe.filter((c) => !c.aso.ok).length;
  const emObra = equipe.filter((c) => c.obraAtual).length;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        <PageHeader
          title="Equipe / RH"
          subtitle="Engenheiros, encarregados, ASOs e certificações NR."
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <UserPlus className="size-4" /> Novo Colaborador
            </button>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: "Colaboradores Ativos", value: ativos },
            { label: "Alocados em Obra", value: emObra },
            { label: "ASOs Vencendo", value: asoVencendo, color: "text-destructive" },
            { label: "Em Férias / Afastados", value: equipe.length - ativos },
          ].map((k) => (
            <div key={k.label} className="bg-card border border-border rounded-md p-4 sm:p-5">
              <div className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground mb-2">{k.label}</div>
              <div className={`text-2xl font-bold tracking-tight ${k.color ?? ""}`}>{k.value}</div>
            </div>
          ))}
        </div>

        {asoVencendo > 0 && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4 flex items-center gap-3">
            <ShieldAlert className="size-5 text-destructive shrink-0" />
            <div className="text-xs">
              <div className="font-semibold text-destructive">{asoVencendo} ASO(s) com vencimento próximo.</div>
              <div className="text-muted-foreground">Agende renovação para não bloquear acesso à obra.</div>
            </div>
            <button className="ml-auto text-[10px] font-bold uppercase tracking-wider px-3 py-2 border border-destructive/40 text-destructive rounded hover:bg-destructive/10">
              Ver Lista
            </button>
          </div>
        )}

        <div className="bg-card border border-border rounded-md overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quadro de Colaboradores</h2>
            <span className="text-[10px] font-mono text-muted-foreground">{equipe.length} registros</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-accent/20">
                <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="px-4 py-3">Colaborador</th>
                  <th className="px-4 py-3">Setor</th>
                  <th className="px-4 py-3">Alocação</th>
                  <th className="px-4 py-3">ASO</th>
                  <th className="px-4 py-3">Treinamentos NR</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {equipe.map((c) => (
                  <tr key={c.id} className="border-t border-border/60 hover:bg-accent/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-gradient-to-br from-primary/40 to-primary grid place-items-center text-primary-foreground text-[10px] font-bold shrink-0">
                          {c.iniciais}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{c.nome}</div>
                          <div className="text-[10px] text-muted-foreground truncate">{c.cargo} · {c.ctps}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.setor}</td>
                    <td className="px-4 py-3 text-[11px]">{c.obraAtual ?? <span className="text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-3">
                      <div className={`flex items-center gap-1.5 ${c.aso.ok ? "text-success" : "text-destructive"}`}>
                        {c.aso.ok ? <ShieldCheck className="size-3.5" /> : <ShieldAlert className="size-3.5" />}
                        <span className="font-mono text-[11px]">{c.aso.vencimento}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.nrs.length === 0 && <span className="text-muted-foreground text-[10px]">—</span>}
                        {c.nrs.map((nr) => (
                          <span key={nr} className="text-[9px] font-mono font-bold bg-accent px-1.5 py-0.5 rounded">
                            {nr}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        variant={c.status === "ativo" ? "success" : c.status === "ferias" ? "primary" : "warning"}
                      >
                        {c.status === "ativo" ? "Ativo" : c.status === "ferias" ? "Férias" : "Afastado"}
                      </StatusBadge>
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
