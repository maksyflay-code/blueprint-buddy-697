import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { frotaInterna } from "@/lib/erp-data";
import {
  Plus,
  Filter,
  Car,
  Wrench,
  Calendar,
  User,
  Gauge,
  Shield,
  Fuel,
  AlertTriangle,
  MapPin,
} from "lucide-react";

export const Route = createFileRoute("/frota-interna")({
  head: () => ({
    meta: [
      { title: "Frota Interna — Vetor ERP" },
      {
        name: "description",
        content:
          "Frota administrativa e de apoio: veículos, motoristas, manutenções e documentos.",
      },
    ],
  }),
  component: FrotaInternaPage,
});

const statusToBadge = {
  ativo: { variant: "success" as const, label: "Ativo" },
  manutencao: { variant: "warning" as const, label: "Oficina" },
  parado: { variant: "muted" as const, label: "Parado" },
};

const tipoColor: Record<string, string> = {
  Diretoria: "bg-primary/10 text-primary border-primary/20",
  Administrativo: "bg-accent text-foreground border-border",
  Operacional: "bg-success/10 text-success border-success/20",
  Carga: "bg-warning/10 text-warning-foreground border-warning/30",
  Apoio: "bg-muted text-muted-foreground border-border",
};

function FrotaInternaPage() {
  const total = frotaInterna.length;
  const ativos = frotaInterna.filter((v) => v.status === "ativo").length;
  const oficina = frotaInterna.filter((v) => v.status === "manutencao").length;
  const parados = frotaInterna.filter((v) => v.status === "parado").length;
  const kmTotal = frotaInterna.reduce((a, v) => a + v.km, 0);
  const manutProximas = frotaInterna.filter((v) =>
    ["HOJE", "12 Jul 2026", "02 Ago 2026"].includes(v.proximaManutencao)
  ).length;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Frota Interna"
          subtitle={`${total} veículos administrativos e de apoio · ${ativos} em operação`}
          actions={
            <>
              <button className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm hover:bg-accent transition-colors">
                <Filter className="size-4" />
                Filtros
              </button>
              <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                <Plus className="size-4" />
                Cadastrar Veículo
              </button>
            </>
          }
        />

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { label: "Total Frota", value: total, icon: Car },
            { label: "Em Operação", value: ativos, color: "text-success" },
            { label: "Em Oficina", value: oficina, color: "text-warning-foreground" },
            { label: "Parados", value: parados, color: "text-muted-foreground" },
            { label: "KM Acumulado", value: kmTotal.toLocaleString("pt-BR") },
          ].map((k) => (
            <div key={k.label} className="bg-card border border-border rounded-md p-3">
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                {k.label}
              </div>
              <div className={`text-lg font-bold tracking-tight mt-1 ${k.color ?? ""}`}>
                {k.value}
              </div>
            </div>
          ))}
        </div>

        {/* Alert manutenções */}
        {manutProximas > 0 && (
          <div className="bg-warning/10 border border-warning/30 rounded-md p-4 flex items-start sm:items-center gap-3">
            <AlertTriangle className="size-5 text-warning shrink-0 mt-0.5 sm:mt-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold">
                {manutProximas} veículo(s) com manutenção nos próximos 60 dias
              </div>
              <div className="text-xs text-muted-foreground">
                Revisar agenda da oficina e disponibilidade dos motoristas.
              </div>
            </div>
          </div>
        )}

        {/* Lista de veículos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {frotaInterna.map((v) => {
            const sBadge = statusToBadge[v.status];
            return (
              <div
                key={v.id}
                className="bg-card border border-border rounded-md p-4 hover:border-primary/40 transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {v.placa}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                          tipoColor[v.tipo] ?? ""
                        }`}
                      >
                        {v.tipo}
                      </span>
                    </div>
                    <div className="text-sm font-semibold truncate">{v.modelo}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {v.ano} · {v.combustivel}
                    </div>
                  </div>
                  <StatusBadge variant={sBadge.variant}>{sBadge.label}</StatusBadge>
                </div>

                <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="size-3 shrink-0" />
                  <span className="truncate">{v.setor}</span>
                </div>

                <div className="border-t border-border pt-3 space-y-2">
                  <div className="flex items-start gap-2">
                    <User className="size-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium truncate">{v.motorista}</div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {v.motoristaCargo}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <Gauge className="size-3 text-muted-foreground shrink-0" />
                      <span className="font-mono">{v.km.toLocaleString("pt-BR")} km</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="size-3 text-muted-foreground shrink-0" />
                      <span>{v.combustivel}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-3 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Wrench className="size-2.5" /> Última manut.
                    </div>
                    <div className="text-xs font-mono mt-0.5">{v.ultimaManutencao}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Calendar className="size-2.5" /> Próxima manut.
                    </div>
                    <div
                      className={`text-xs font-mono mt-0.5 font-bold ${
                        v.proximaManutencao === "HOJE" ? "text-destructive" : ""
                      }`}
                    >
                      {v.proximaManutencao}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <Shield className="size-2.5" /> Seguro
                    </div>
                    <div className="text-xs font-mono mt-0.5">{v.vencimentoSeguro}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      IPVA
                    </div>
                    <div className="text-xs font-mono mt-0.5">{v.vencimentoIPVA}</div>
                  </div>
                </div>

                {v.observacao && (
                  <div className="text-[11px] text-muted-foreground bg-accent/40 border border-border rounded px-2 py-1.5 leading-snug">
                    {v.observacao}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
