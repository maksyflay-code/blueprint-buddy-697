import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { documentos } from "@/lib/erp-data";
import { Upload, FileText, Image as ImageIcon, Download, Search } from "lucide-react";

export const Route = createFileRoute("/documentos")({
  head: () => ({ meta: [{ title: "Documentos — Vetor ERP" }] }),
  component: DocumentosPage,
});

const tipoColors: Record<string, string> = {
  Contrato: "bg-primary/10 text-primary",
  NF: "bg-success/15 text-success",
  Checklist: "bg-warning/20 text-warning-foreground",
  Laudo: "bg-destructive/10 text-destructive",
  ART: "bg-accent text-foreground",
  Manual: "bg-muted text-muted-foreground",
};

function DocumentosPage() {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          title="Documentos"
          subtitle={`${documentos.length} arquivos · contratos, ARTs, checklists e laudos técnicos`}
          actions={
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              <Upload className="size-4" /> Enviar Documento
            </button>
          }
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              placeholder="Buscar por nome, vínculo ou tipo..."
              className="w-full bg-card border border-border rounded px-9 py-2 text-sm"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto -mx-1 px-1">
            {["Todos", "Contratos", "ARTs", "NF", "Laudos"].map((t) => (
              <button
                key={t}
                className="px-3 py-1.5 text-xs font-medium rounded hover:bg-accent transition-colors text-muted-foreground whitespace-nowrap"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-accent/30 border-b border-border">
              <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-3">Documento</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Vinculado a</th>
                <th className="px-6 py-3">Enviado por</th>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Tamanho</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((d, i) => (
                <tr
                  key={d.id}
                  className="border-t border-border/60 hover:bg-accent/30 transition-colors animate-in-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded bg-accent grid place-items-center shrink-0">
                        {d.formato === "img" ? (
                          <ImageIcon className="size-4 text-muted-foreground" />
                        ) : (
                          <FileText className="size-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="font-medium font-mono text-[11px]">{d.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${tipoColors[d.tipo]}`}>
                      {d.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{d.vinculadoA}</td>
                  <td className="px-6 py-4">{d.uploadPor}</td>
                  <td className="px-6 py-4 text-muted-foreground">{d.data}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{d.tamanho}</td>
                  <td className="px-6 py-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <Download className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="bg-card border border-dashed border-border rounded-md p-10 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="size-8 mx-auto text-muted-foreground mb-3" />
          <div className="text-sm font-semibold">Arraste documentos aqui</div>
          <div className="text-xs text-muted-foreground mt-1">
            ou <span className="text-primary font-medium">clique para selecionar</span> · PDF, DOC, JPG, PNG · até 20MB
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
