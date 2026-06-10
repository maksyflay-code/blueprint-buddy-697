import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader, StatusBadge } from "@/components/AppLayout";
import { solicitacoes } from "@/lib/erp-data";
import { Plus, Paperclip, FileText, Image as ImageIcon, Upload } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/solicitacoes")({
  head: () => ({ meta: [{ title: "Solicitações Internas — Vetor ERP" }] }),
  component: SolicitacoesPage,
});

const statusBadge = {
  pendente: { variant: "warning" as const, label: "Pendente" },
  aprovado: { variant: "success" as const, label: "Aprovado" },
  rejeitado: { variant: "destructive" as const, label: "Rejeitado" },
  andamento: { variant: "primary" as const, label: "Em Andamento" },
};

function SolicitacoesPage() {
  const [filter, setFilter] = useState<"todas" | "pendente" | "andamento" | "aprovado">("todas");
  const filtered = filter === "todas" ? solicitacoes : solicitacoes.filter((s) => s.status === filter);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Solicitações Internas"
          subtitle="Fluxo de aprovação para manutenções, mobilizações e compras"
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Plus className="size-4" /> Nova Solicitação
            </button>
          }
        />

        <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto">
          {(["todas", "pendente", "andamento", "aprovado"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {f === "todas" ? "Todas" : f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-3">
            {filtered.map((r, i) => {
              const sb = statusBadge[r.status];
              return (
                <div
                  key={r.id}
                  className="bg-card border border-border rounded-md p-5 animate-in-up hover:border-primary/40 transition-colors"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        #{r.numero}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {r.tipo}
                      </span>
                      {r.prioridade === "alta" && (
                        <StatusBadge variant="destructive">Alta</StatusBadge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] text-muted-foreground">{r.tempo}</span>
                      <StatusBadge variant={sb.variant}>{sb.label}</StatusBadge>
                    </div>
                  </div>

                  <div className="text-sm font-semibold mb-1">{r.titulo}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {r.descricao}
                  </p>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="size-7 rounded-full bg-gradient-to-br from-primary/30 to-primary grid place-items-center text-primary-foreground text-[10px] font-bold">
                      {r.solicitante
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="text-muted-foreground">
                      <span className="text-foreground font-medium">{r.solicitante}</span> ·{" "}
                      {r.setor}
                    </div>
                  </div>

                  {r.anexos.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">
                        <Paperclip className="size-3" /> Anexos ({r.anexos.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {r.anexos.map((a) => (
                          <div
                            key={a.nome}
                            className="flex items-center gap-2 px-3 py-2 bg-accent rounded border border-border/50 text-xs hover:bg-accent/70 cursor-pointer transition-colors"
                          >
                            {a.tipo === "img" ? (
                              <ImageIcon className="size-3.5 text-primary" />
                            ) : (
                              <FileText className="size-3.5 text-primary" />
                            )}
                            <span className="font-medium">{a.nome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {r.status === "pendente" && (
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded uppercase tracking-wider hover:bg-primary/90 transition-colors">
                        Aprovar
                      </button>
                      <button className="px-4 py-2 border border-border text-xs font-bold rounded uppercase text-muted-foreground hover:bg-accent transition-colors">
                        Rejeitar
                      </button>
                      <button className="ml-auto px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Solicitar Detalhes
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick request panel */}
          <div className="space-y-4 sticky top-20 self-start">
            <div className="bg-card border border-border rounded-md p-5">
              <h3 className="text-sm font-bold mb-1">Nova Solicitação Rápida</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Crie uma solicitação interna e anexe documentos.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Tipo
                  </label>
                  <select className="w-full bg-accent/40 border border-border rounded px-3 py-2 text-sm">
                    <option>Manutenção Corretiva</option>
                    <option>Manutenção Preventiva</option>
                    <option>Mobilização</option>
                    <option>Compra de Peça</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Equipamento
                  </label>
                  <select className="w-full bg-accent/40 border border-border rounded px-3 py-2 text-sm">
                    <option>CAT-9220-B — Escavadeira 20t</option>
                    <option>CUM-500-ST — Gerador 500kVA</option>
                    <option>JCB-3CX — Retroescavadeira</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descreva a solicitação..."
                    className="w-full bg-accent/40 border border-border rounded px-3 py-2 text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                    Anexos
                  </label>
                  <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-primary cursor-pointer transition-colors group">
                    <Upload className="size-5 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="text-xs text-muted-foreground mt-2">
                      Arraste arquivos ou <span className="text-primary font-medium">clique aqui</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground/70 mt-1">
                      PDF, JPG, PNG · até 20MB
                    </div>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider rounded hover:bg-primary/90 transition-colors">
                  Enviar para Aprovação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
