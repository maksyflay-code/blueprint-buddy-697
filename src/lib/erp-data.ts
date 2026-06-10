import escavadeira from "@/assets/equip-escavadeira.jpg";
import gerador from "@/assets/equip-gerador.jpg";
import betoneira from "@/assets/equip-betoneira.jpg";
import retroescavadeira from "@/assets/equip-retroescavadeira.jpg";

export type EquipmentStatus = "alugado" | "disponivel" | "manutencao" | "transito";

export interface Equipment {
  id: string;
  codigo: string;
  nome: string;
  categoria: string;
  status: EquipmentStatus;
  cliente?: string;
  obra?: string;
  local?: string;
  horimetro: number;
  proxManutencao: string;
  diaria: number;
  imagem: string;
}

export const equipamentos: Equipment[] = [
  {
    id: "1",
    codigo: "CAT-9220-B",
    nome: "Escavadeira Hidráulica 20t",
    categoria: "Escavadeira",
    status: "alugado",
    cliente: "Moura Engenharia",
    obra: "Rodovia BR-101 Sul",
    horimetro: 4820,
    proxManutencao: "12 Jan",
    diaria: 2800,
    imagem: escavadeira,
  },
  {
    id: "2",
    codigo: "CUM-500-ST",
    nome: "Gerador 500kVA Cummins",
    categoria: "Gerador",
    status: "manutencao",
    local: "Pátio Central - Oficina",
    horimetro: 4210,
    proxManutencao: "HOJE",
    diaria: 1200,
    imagem: gerador,
  },
  {
    id: "3",
    codigo: "MEN-400-X",
    nome: "Betoneira 400L Menegotti",
    categoria: "Betoneira",
    status: "disponivel",
    local: "Pátio Central - Bay 04",
    horimetro: 820,
    proxManutencao: "28 Fev",
    diaria: 450,
    imagem: betoneira,
  },
  {
    id: "4",
    codigo: "JCB-3CX",
    nome: "Retroescavadeira JCB 3CX 4x4",
    categoria: "Retroescavadeira",
    status: "alugado",
    cliente: "ConstruTec S.A.",
    obra: "Obra Estádio Nacional",
    horimetro: 6340,
    proxManutencao: "05 Fev",
    diaria: 1800,
    imagem: retroescavadeira,
  },
  {
    id: "5",
    codigo: "CAT-320L-A",
    nome: "Escavadeira CAT 320L",
    categoria: "Escavadeira",
    status: "alugado",
    cliente: "Construtora Norberto",
    obra: "Skyline Tower - Site B",
    horimetro: 3100,
    proxManutencao: "22 Jan",
    diaria: 2750,
    imagem: escavadeira,
  },
  {
    id: "6",
    codigo: "GER-220-K",
    nome: "Gerador 220kVA Stemac",
    categoria: "Gerador",
    status: "disponivel",
    local: "Pátio Norte - Bay 02",
    horimetro: 1560,
    proxManutencao: "15 Mar",
    diaria: 680,
    imagem: gerador,
  },
  {
    id: "7",
    codigo: "JCB-3CX-B",
    nome: "Retroescavadeira JCB 3CX",
    categoria: "Retroescavadeira",
    status: "transito",
    cliente: "Duran Engenharia",
    obra: "Canteiro Alphaville IV",
    horimetro: 2890,
    proxManutencao: "30 Jan",
    diaria: 1750,
    imagem: retroescavadeira,
  },
  {
    id: "8",
    codigo: "MEN-400-Y",
    nome: "Betoneira 400L",
    categoria: "Betoneira",
    status: "alugado",
    cliente: "Duran Engenharia",
    obra: "Residencial Vista Mar",
    horimetro: 1240,
    proxManutencao: "18 Fev",
    diaria: 450,
    imagem: betoneira,
  },
];

export interface InternalRequest {
  id: string;
  numero: string;
  tipo: "Manutenção Preventiva" | "Manutenção Corretiva" | "Mobilização" | "Compra de Peça" | "Liberação";
  titulo: string;
  descricao: string;
  solicitante: string;
  setor: string;
  status: "pendente" | "aprovado" | "rejeitado" | "andamento";
  tempo: string;
  anexos: { nome: string; tipo: "pdf" | "img" | "doc" }[];
  prioridade: "alta" | "media" | "baixa";
}

export const solicitacoes: InternalRequest[] = [
  {
    id: "s1",
    numero: "SOL-9281",
    tipo: "Manutenção Corretiva",
    titulo: "Vazamento hidráulico - braço frontal ESC-012",
    descricao:
      "Operador relata vazamento de óleo hidráulico no braço frontal. Necessário diagnóstico e troca de vedação.",
    solicitante: "Carlos Eduardo",
    setor: "Oficina",
    status: "pendente",
    tempo: "Há 24 min",
    anexos: [
      { nome: "Orcamento_Hidraulica.pdf", tipo: "pdf" },
      { nome: "Foto_Vazamento.jpg", tipo: "img" },
    ],
    prioridade: "alta",
  },
  {
    id: "s2",
    numero: "SOL-9279",
    tipo: "Mobilização",
    titulo: "Requisição de mobilização Gerador 500kVA",
    descricao:
      "Envio imediato do GER-005 para Obra Alphaville. Contrato assinado, aguardando liberação logística.",
    solicitante: "Ana Paula",
    setor: "Comercial",
    status: "aprovado",
    tempo: "Há 2h",
    anexos: [{ nome: "Contrato_Assinado.pdf", tipo: "pdf" }],
    prioridade: "media",
  },
  {
    id: "s3",
    numero: "SOL-9277",
    tipo: "Compra de Peça",
    titulo: "Filtro de combustível CAT 320L (lote 4 un.)",
    descricao: "Estoque mínimo atingido. Solicito compra para reposição preventiva da frota.",
    solicitante: "Marcio Silva",
    setor: "Almoxarifado",
    status: "andamento",
    tempo: "Há 5h",
    anexos: [
      { nome: "Especificacao_Tecnica.pdf", tipo: "pdf" },
      { nome: "Cotacao_Fornecedor.pdf", tipo: "pdf" },
    ],
    prioridade: "media",
  },
  {
    id: "s4",
    numero: "SOL-9275",
    tipo: "Liberação",
    titulo: "Liberação técnica RET-004 para ConstruTec",
    descricao: "Checklist concluído, NR-12 em dia. Aguardando aprovação do gestor.",
    solicitante: "Eng. Roberta",
    setor: "Engenharia",
    status: "aprovado",
    tempo: "Ontem",
    anexos: [
      { nome: "Checklist_NR12.pdf", tipo: "pdf" },
      { nome: "Termo_Responsabilidade.pdf", tipo: "pdf" },
    ],
    prioridade: "baixa",
  },
  {
    id: "s5",
    numero: "SOL-9270",
    tipo: "Manutenção Preventiva",
    titulo: "Troca de óleo e filtros - Frota A (8 máquinas)",
    descricao: "Ciclo preventivo trimestral conforme plano de manutenção.",
    solicitante: "Carlos Eduardo",
    setor: "Oficina",
    status: "andamento",
    tempo: "2 dias atrás",
    anexos: [{ nome: "Plano_Manutencao_Q1.pdf", tipo: "pdf" }],
    prioridade: "media",
  },
  {
    id: "s6",
    numero: "SOL-9265",
    tipo: "Mobilização",
    titulo: "Desmobilização Betoneira BET-019",
    descricao: "Fim de contrato. Logística reversa solicitada para 18/01.",
    solicitante: "Felipe Tavares",
    setor: "Logística",
    status: "pendente",
    tempo: "3 dias atrás",
    anexos: [],
    prioridade: "baixa",
  },
];

export interface Rental {
  contrato: string;
  cliente: string;
  cnpj: string;
  obra: string;
  equipamento: string;
  inicio: string;
  fim: string;
  valor: number;
  status: "vigente" | "pendente_assinatura" | "encerrado" | "atrasado";
}

export const locacoes: Rental[] = [
  {
    contrato: "882/24",
    cliente: "ConstruTec S.A.",
    cnpj: "12.345.678/0001-90",
    obra: "Obra Estádio Nacional",
    equipamento: "Retroescavadeira JCB 3CX",
    inicio: "15 Dez",
    fim: "15 Jan",
    valor: 14200,
    status: "vigente",
  },
  {
    contrato: "881/24",
    cliente: "Moura Engenharia",
    cnpj: "98.765.432/0001-12",
    obra: "Rodovia BR-101 Sul",
    equipamento: "Escavadeira CAT 20t",
    inicio: "02 Dez",
    fim: "02 Jan",
    valor: 22450,
    status: "vigente",
  },
  {
    contrato: "880/24",
    cliente: "Construtora Norberto",
    cnpj: "44.123.567/0001-44",
    obra: "Skyline Tower - Site B",
    equipamento: "Escavadeira CAT 320L",
    inicio: "20 Nov",
    fim: "20 Fev",
    valor: 82500,
    status: "vigente",
  },
  {
    contrato: "879/24",
    cliente: "Duran Engenharia",
    cnpj: "55.987.321/0001-77",
    obra: "Residencial Vista Mar",
    equipamento: "2x Betoneira 400L",
    inicio: "01 Jan",
    fim: "30 Jan",
    valor: 2400,
    status: "pendente_assinatura",
  },
  {
    contrato: "878/24",
    cliente: "Pavitec Ltda",
    cnpj: "33.444.555/0001-22",
    obra: "Asfaltamento Av. Brasil",
    equipamento: "Rolo Compactador CAT",
    inicio: "10 Dez",
    fim: "10 Jan",
    valor: 18900,
    status: "atrasado",
  },
  {
    contrato: "877/23",
    cliente: "GME Construções",
    cnpj: "22.333.444/0001-55",
    obra: "Galpão Industrial Cajamar",
    equipamento: "Gerador 220kVA Stemac",
    inicio: "01 Out",
    fim: "01 Dez",
    valor: 9800,
    status: "encerrado",
  },
];

export interface Client {
  id: string;
  nome: string;
  cnpj: string;
  cidade: string;
  contratosAtivos: number;
  valorTotal: number;
  status: "ativo" | "inadimplente" | "prospect";
  ultimaInteracao: string;
}

export const clientes: Client[] = [
  {
    id: "c1",
    nome: "ConstruTec S.A.",
    cnpj: "12.345.678/0001-90",
    cidade: "São Paulo, SP",
    contratosAtivos: 4,
    valorTotal: 184500,
    status: "ativo",
    ultimaInteracao: "Há 2 dias",
  },
  {
    id: "c2",
    nome: "Moura Engenharia",
    cnpj: "98.765.432/0001-12",
    cidade: "Campinas, SP",
    contratosAtivos: 2,
    valorTotal: 67200,
    status: "ativo",
    ultimaInteracao: "Hoje",
  },
  {
    id: "c3",
    nome: "Construtora Norberto",
    cnpj: "44.123.567/0001-44",
    cidade: "Rio de Janeiro, RJ",
    contratosAtivos: 3,
    valorTotal: 245800,
    status: "ativo",
    ultimaInteracao: "Há 1 semana",
  },
  {
    id: "c4",
    nome: "Duran Engenharia",
    cnpj: "55.987.321/0001-77",
    cidade: "Belo Horizonte, MG",
    contratosAtivos: 2,
    valorTotal: 32100,
    status: "ativo",
    ultimaInteracao: "Há 3 dias",
  },
  {
    id: "c5",
    nome: "Pavitec Ltda",
    cnpj: "33.444.555/0001-22",
    cidade: "Curitiba, PR",
    contratosAtivos: 1,
    valorTotal: 18900,
    status: "inadimplente",
    ultimaInteracao: "Há 12 dias",
  },
  {
    id: "c6",
    nome: "GME Construções",
    cnpj: "22.333.444/0001-55",
    cidade: "Guarulhos, SP",
    contratosAtivos: 0,
    valorTotal: 9800,
    status: "prospect",
    ultimaInteracao: "Há 1 mês",
  },
];

export interface Maintenance {
  id: string;
  equipamento: string;
  codigo: string;
  tipo: "Preventiva" | "Corretiva" | "Inspeção" | "NR-12";
  responsavel: string;
  data: string;
  status: "agendada" | "em_execucao" | "concluida" | "atrasada";
  prioridade: "alta" | "media" | "baixa";
}

export const manutencoes: Maintenance[] = [
  {
    id: "m1",
    equipamento: "Gerador 500kVA Cummins",
    codigo: "CUM-500-ST",
    tipo: "Corretiva",
    responsavel: "Carlos Eduardo",
    data: "Hoje, 14:00",
    status: "em_execucao",
    prioridade: "alta",
  },
  {
    id: "m2",
    equipamento: "Escavadeira CAT 320L",
    codigo: "CAT-320L-A",
    tipo: "Preventiva",
    responsavel: "Marcio Silva",
    data: "22 Jan",
    status: "agendada",
    prioridade: "media",
  },
  {
    id: "m3",
    equipamento: "Retroescavadeira JCB 3CX",
    codigo: "JCB-3CX",
    tipo: "NR-12",
    responsavel: "Eng. Roberta",
    data: "05 Fev",
    status: "agendada",
    prioridade: "media",
  },
  {
    id: "m4",
    equipamento: "Escavadeira Hidráulica 20t",
    codigo: "CAT-9220-B",
    tipo: "Inspeção",
    responsavel: "Carlos Eduardo",
    data: "Ontem",
    status: "concluida",
    prioridade: "baixa",
  },
  {
    id: "m5",
    equipamento: "Betoneira 400L",
    codigo: "MEN-400-Y",
    tipo: "Preventiva",
    responsavel: "Marcio Silva",
    data: "10 Jan",
    status: "atrasada",
    prioridade: "alta",
  },
  {
    id: "m6",
    equipamento: "Rolo Compactador CAT",
    codigo: "RC-CAT-08",
    tipo: "Corretiva",
    responsavel: "Felipe Tavares",
    data: "Amanhã, 09:00",
    status: "agendada",
    prioridade: "alta",
  },
];

export interface Document {
  id: string;
  nome: string;
  tipo: "Contrato" | "NF" | "Checklist" | "Laudo" | "ART" | "Manual";
  vinculadoA: string;
  uploadPor: string;
  data: string;
  tamanho: string;
  formato: "pdf" | "img" | "doc";
}

export const documentos: Document[] = [
  {
    id: "d1",
    nome: "Contrato_882-24_ConstruTec.pdf",
    tipo: "Contrato",
    vinculadoA: "Locação #882/24",
    uploadPor: "Ana Paula",
    data: "Hoje",
    tamanho: "1.2 MB",
    formato: "pdf",
  },
  {
    id: "d2",
    nome: "ART_Engenheiro_Responsavel.pdf",
    tipo: "ART",
    vinculadoA: "Obra Estádio Nacional",
    uploadPor: "Eng. Roberta",
    data: "Ontem",
    tamanho: "340 KB",
    formato: "pdf",
  },
  {
    id: "d3",
    nome: "Checklist_NR12_RET-004.pdf",
    tipo: "Checklist",
    vinculadoA: "JCB-3CX",
    uploadPor: "Carlos Eduardo",
    data: "Há 2 dias",
    tamanho: "780 KB",
    formato: "pdf",
  },
  {
    id: "d4",
    nome: "NF_4521_Pecas_Hidraulica.pdf",
    tipo: "NF",
    vinculadoA: "SOL-9281",
    uploadPor: "Almoxarifado",
    data: "Há 3 dias",
    tamanho: "210 KB",
    formato: "pdf",
  },
  {
    id: "d5",
    nome: "Laudo_Tecnico_Gerador_500.pdf",
    tipo: "Laudo",
    vinculadoA: "CUM-500-ST",
    uploadPor: "Eng. Roberta",
    data: "Há 5 dias",
    tamanho: "2.4 MB",
    formato: "pdf",
  },
  {
    id: "d6",
    nome: "Foto_Vazamento_ESC012.jpg",
    tipo: "Laudo",
    vinculadoA: "SOL-9281",
    uploadPor: "Carlos Eduardo",
    data: "Hoje",
    tamanho: "3.1 MB",
    formato: "img",
  },
  {
    id: "d7",
    nome: "Manual_Operacional_JCB3CX.pdf",
    tipo: "Manual",
    vinculadoA: "JCB-3CX",
    uploadPor: "Sistema",
    data: "01 Jan",
    tamanho: "8.7 MB",
    formato: "pdf",
  },
];

export const kpis = {
  receitaMensal: 284500,
  receitaDelta: 12.4,
  utilizacao: 88.2,
  locacoesAtivas: 42,
  devolucoesHoje: 5,
  emManutencao: 6,
  criticos: 3,
  solicitacoesPendentes: 8,
};

export const receitaSerie = [
  { mes: "Jul", valor: 198 },
  { mes: "Ago", valor: 215 },
  { mes: "Set", valor: 240 },
  { mes: "Out", valor: 232 },
  { mes: "Nov", valor: 253 },
  { mes: "Dez", valor: 284 },
];

export const utilizacaoPorCategoria = [
  { categoria: "Escavadeiras", percentual: 95, total: 12 },
  { categoria: "Retroescavadeiras", percentual: 88, total: 8 },
  { categoria: "Geradores", percentual: 76, total: 14 },
  { categoria: "Betoneiras", percentual: 82, total: 18 },
  { categoria: "Rolos Compactadores", percentual: 70, total: 6 },
];

// ============================================================
// LICITAÇÕES
// ============================================================
export type LicitacaoStatus =
  | "monitorando"
  | "preparando"
  | "enviada"
  | "habilitada"
  | "vencida"
  | "perdida";

export interface Licitacao {
  id: string;
  numero: string;
  orgao: string;
  modalidade: "Pregão Eletrônico" | "Concorrência" | "Tomada de Preços" | "RDC" | "Dispensa";
  objeto: string;
  uf: string;
  valorEstimado: number;
  valorProposta?: number;
  abertura: string;
  prazoEntrega: string;
  status: LicitacaoStatus;
  responsavel: string;
  probabilidade: number;
  documentos: number;
}

export const licitacoes: Licitacao[] = [
  { id: "l1", numero: "PE 045/2026 — DNIT", orgao: "DNIT - Superintendência SC", modalidade: "Pregão Eletrônico", objeto: "Recuperação de pavimento BR-282 km 120-180", uf: "SC", valorEstimado: 8420000, valorProposta: 7980000, abertura: "18 Jun, 10:00", prazoEntrega: "Em 6 dias", status: "preparando", responsavel: "Eng. Roberta", probabilidade: 72, documentos: 14 },
  { id: "l2", numero: "CC 012/2026 — DER/SP", orgao: "DER - São Paulo", modalidade: "Concorrência", objeto: "Construção de viaduto sobre Rodovia Anhanguera", uf: "SP", valorEstimado: 24800000, valorProposta: 23150000, abertura: "25 Jun, 14:30", prazoEntrega: "Em 13 dias", status: "preparando", responsavel: "Eng. Ricardo M.", probabilidade: 55, documentos: 28 },
  { id: "l3", numero: "PE 119/2026 — Pref. BH", orgao: "Prefeitura de Belo Horizonte", modalidade: "Pregão Eletrônico", objeto: "Locação de retroescavadeiras e basculantes 12m", uf: "MG", valorEstimado: 1850000, valorProposta: 1740000, abertura: "05 Jun, 09:00", prazoEntrega: "Encerrada", status: "vencida", responsavel: "Ana Paula", probabilidade: 100, documentos: 11 },
  { id: "l4", numero: "TP 008/2026 — SANEPAR", orgao: "SANEPAR - Paraná", modalidade: "Tomada de Preços", objeto: "Rede coletora de esgoto - Bairro Boqueirão", uf: "PR", valorEstimado: 3420000, abertura: "30 Jun, 15:00", prazoEntrega: "Em 18 dias", status: "monitorando", responsavel: "Eng. Roberta", probabilidade: 40, documentos: 3 },
  { id: "l5", numero: "PE 077/2026 — CODESP", orgao: "CODESP - Porto Santos", modalidade: "Pregão Eletrônico", objeto: "Terraplanagem retroárea cais 12", uf: "SP", valorEstimado: 5680000, valorProposta: 5320000, abertura: "02 Jun, 11:00", prazoEntrega: "Habilitação técnica", status: "enviada", responsavel: "Eng. Ricardo M.", probabilidade: 65, documentos: 19 },
  { id: "l6", numero: "PE 022/2026 — INFRAERO", orgao: "INFRAERO - Aeroporto SDU", modalidade: "Pregão Eletrônico", objeto: "Reforço de pista de pouso e taxiway", uf: "RJ", valorEstimado: 12500000, valorProposta: 12800000, abertura: "28 Mai, 14:00", prazoEntrega: "Encerrada", status: "perdida", responsavel: "Eng. Ricardo M.", probabilidade: 0, documentos: 22 },
];

// ============================================================
// OBRAS
// ============================================================
export type ObraStatus = "planejamento" | "execucao" | "paralisada" | "concluida";

export interface Obra {
  id: string;
  codigo: string;
  nome: string;
  contratante: string;
  cidade: string;
  uf: string;
  inicio: string;
  prazoFim: string;
  valorContrato: number;
  medido: number;
  fisico: number;
  financeiro: number;
  status: ObraStatus;
  responsavel: string;
  equipe: number;
  equipamentos: number;
  alerta?: string;
}

export const obras: Obra[] = [
  { id: "o1", codigo: "OB-024", nome: "Rodovia BR-101 Sul — Lote 03", contratante: "DNIT", cidade: "Tubarão", uf: "SC", inicio: "10 Fev 2026", prazoFim: "30 Out 2026", valorContrato: 18420000, medido: 11420000, fisico: 62, financeiro: 58, status: "execucao", responsavel: "Eng. Roberta", equipe: 42, equipamentos: 12 },
  { id: "o2", codigo: "OB-022", nome: "Estádio Nacional — Fundações", contratante: "ConstruTec S.A.", cidade: "Brasília", uf: "DF", inicio: "05 Jan 2026", prazoFim: "20 Set 2026", valorContrato: 9850000, medido: 4720000, fisico: 48, financeiro: 48, status: "execucao", responsavel: "Eng. Ricardo M.", equipe: 28, equipamentos: 7 },
  { id: "o3", codigo: "OB-019", nome: "Skyline Tower — Estrutura", contratante: "Construtora Norberto", cidade: "Rio de Janeiro", uf: "RJ", inicio: "20 Nov 2025", prazoFim: "20 Mai 2026", valorContrato: 14200000, medido: 12800000, fisico: 92, financeiro: 90, status: "execucao", responsavel: "Eng. Ricardo M.", equipe: 34, equipamentos: 5 },
  { id: "o4", codigo: "OB-017", nome: "Asfaltamento Av. Brasil", contratante: "Pavitec Ltda", cidade: "Curitiba", uf: "PR", inicio: "10 Dez 2025", prazoFim: "10 Abr 2026", valorContrato: 4250000, medido: 1980000, fisico: 41, financeiro: 46, status: "paralisada", responsavel: "Eng. Roberta", equipe: 0, equipamentos: 2, alerta: "Aguardando liberação ambiental" },
  { id: "o5", codigo: "OB-025", nome: "Galpão Industrial Cajamar", contratante: "GME Construções", cidade: "Cajamar", uf: "SP", inicio: "01 Jun 2026", prazoFim: "15 Dez 2026", valorContrato: 6720000, medido: 0, fisico: 3, financeiro: 0, status: "planejamento", responsavel: "Eng. Ricardo M.", equipe: 4, equipamentos: 0 },
  { id: "o6", codigo: "OB-015", nome: "Canteiro Alphaville IV", contratante: "Duran Engenharia", cidade: "Barueri", uf: "SP", inicio: "01 Ago 2025", prazoFim: "01 Mar 2026", valorContrato: 5180000, medido: 5180000, fisico: 100, financeiro: 100, status: "concluida", responsavel: "Eng. Roberta", equipe: 0, equipamentos: 0 },
];

// ============================================================
// EQUIPE / RH
// ============================================================
export interface Colaborador {
  id: string;
  nome: string;
  cargo: string;
  setor: "Engenharia" | "Obra" | "Oficina" | "Administrativo" | "Comercial";
  obraAtual?: string;
  status: "ativo" | "ferias" | "afastado";
  aso: { vencimento: string; ok: boolean };
  nrs: string[];
  ctps: string;
  iniciais: string;
}

export const equipe: Colaborador[] = [
  { id: "e1", nome: "Eng. Ricardo Moreira", cargo: "Engenheiro Civil Sênior", setor: "Engenharia", obraAtual: "OB-022 Estádio Nacional", status: "ativo", aso: { vencimento: "12 Set 2026", ok: true }, nrs: ["NR-18", "NR-35", "NR-10"], ctps: "CREA 124589-D", iniciais: "RM" },
  { id: "e2", nome: "Eng. Roberta Lemos", cargo: "Engenheira de Produção", setor: "Engenharia", obraAtual: "OB-024 BR-101 Sul", status: "ativo", aso: { vencimento: "04 Ago 2026", ok: true }, nrs: ["NR-12", "NR-18", "NR-33"], ctps: "CREA 187420-D", iniciais: "RL" },
  { id: "e3", nome: "Carlos Eduardo Santos", cargo: "Encarregado de Oficina", setor: "Oficina", status: "ativo", aso: { vencimento: "22 Jul 2026", ok: true }, nrs: ["NR-12", "NR-10"], ctps: "CTPS 88421-02", iniciais: "CS" },
  { id: "e4", nome: "Marcio Silva", cargo: "Mecânico Industrial", setor: "Oficina", status: "ativo", aso: { vencimento: "28 Jun 2026", ok: false }, nrs: ["NR-12"], ctps: "CTPS 92011-04", iniciais: "MS" },
  { id: "e5", nome: "Ana Paula Ribeiro", cargo: "Coordenadora Comercial", setor: "Comercial", status: "ativo", aso: { vencimento: "10 Jan 2027", ok: true }, nrs: [], ctps: "CTPS 65120-01", iniciais: "AP" },
  { id: "e6", nome: "Felipe Tavares", cargo: "Operador de Máquinas Pesadas", setor: "Obra", obraAtual: "OB-019 Skyline Tower", status: "ativo", aso: { vencimento: "15 Ago 2026", ok: true }, nrs: ["NR-12", "NR-18", "NR-35"], ctps: "CTPS 71203-03", iniciais: "FT" },
  { id: "e7", nome: "Juliana Alves", cargo: "Assistente Administrativo", setor: "Administrativo", status: "ferias", aso: { vencimento: "30 Mar 2027", ok: true }, nrs: [], ctps: "CTPS 44587-02", iniciais: "JA" },
  { id: "e8", nome: "Pedro Henrique Costa", cargo: "Mestre de Obras", setor: "Obra", obraAtual: "OB-024 BR-101 Sul", status: "ativo", aso: { vencimento: "18 Out 2026", ok: true }, nrs: ["NR-18", "NR-35", "NR-33"], ctps: "CTPS 33890-01", iniciais: "PC" },
];

// ============================================================
// COMPRAS / SUPRIMENTOS
// ============================================================
export interface OrdemCompra {
  id: string;
  numero: string;
  fornecedor: string;
  obra: string;
  itens: string;
  valor: number;
  emissao: string;
  entregaPrevista: string;
  status: "cotacao" | "aprovacao" | "emitida" | "recebida" | "atrasada";
  comprador: string;
}

export const compras: OrdemCompra[] = [
  { id: "p1", numero: "OC-3421", fornecedor: "Aço Norte Distribuidora", obra: "OB-024 BR-101 Sul", itens: "Vergalhão CA-50 (12 t) + tela soldada Q-196", valor: 184500, emissao: "08 Jun", entregaPrevista: "15 Jun", status: "emitida", comprador: "Ana Paula" },
  { id: "p2", numero: "OC-3420", fornecedor: "Concrebrás Concreto", obra: "OB-022 Estádio Nacional", itens: "Concreto usinado FCK 30 — 240 m³", valor: 96400, emissao: "08 Jun", entregaPrevista: "12 Jun", status: "emitida", comprador: "Ana Paula" },
  { id: "p3", numero: "OC-3418", fornecedor: "Hidráulica Diesel Ltda", obra: "Pátio Central — Frota", itens: "Kit reparo bomba hidráulica CAT 320", valor: 14800, emissao: "06 Jun", entregaPrevista: "10 Jun", status: "recebida", comprador: "Marcio Silva" },
  { id: "p4", numero: "OC-3417", fornecedor: "Petrobrás Distribuidora", obra: "Frota Geral", itens: "Diesel S-10 — 8.000 L", valor: 48200, emissao: "05 Jun", entregaPrevista: "07 Jun", status: "atrasada", comprador: "Felipe Tavares" },
  { id: "p5", numero: "OC-3415", fornecedor: "EPI Brasil Segurança", obra: "Geral", itens: "Capacetes, botas e cintos NR-35 (lote)", valor: 11200, emissao: "03 Jun", entregaPrevista: "10 Jun", status: "aprovacao", comprador: "Juliana Alves" },
  { id: "p6", numero: "COT-0992", fornecedor: "3 fornecedores em análise", obra: "OB-025 Galpão Cajamar", itens: "Estrutura metálica — 84 t", valor: 1240000, emissao: "02 Jun", entregaPrevista: "—", status: "cotacao", comprador: "Ana Paula" },
];

// ============================================================
// KPIs EXECUTIVOS
// ============================================================
export const kpisExecutivo = {
  obrasAtivas: 4,
  obrasValor: 47120000,
  licitacoesAbertas: 4,
  licitacoesValor: 38380000,
  taxaSucesso: 38,
  receitaLocacao: 284500,
  receitaObras: 1840000,
  margemBruta: 22.4,
  contasReceber: 1280400,
  contasPagar: 740200,
  colaboradores: 142,
  asoVencendo: 3,
};

export const pipelineFunil = [
  { etapa: "Monitorando", quantidade: 12, valor: 42800000 },
  { etapa: "Preparando", quantidade: 5, valor: 38420000 },
  { etapa: "Enviada", quantidade: 3, valor: 18650000 },
  { etapa: "Habilitada", quantidade: 2, valor: 9420000 },
  { etapa: "Vencida (mês)", quantidade: 2, valor: 4180000 },
];

// ============ FROTA INTERNA / ADMINISTRATIVA ============
export type FrotaInternaStatus = "ativo" | "manutencao" | "parado";
export type FrotaInternaTipo = "Diretoria" | "Administrativo" | "Operacional" | "Carga" | "Apoio";

export interface VeiculoInterno {
  id: string;
  placa: string;
  modelo: string;
  ano: number;
  tipo: FrotaInternaTipo;
  setor: string;
  motorista: string;
  motoristaCargo: string;
  km: number;
  ultimaManutencao: string;
  proximaManutencao: string;
  proximaRevisaoKm: number;
  vencimentoIPVA: string;
  vencimentoSeguro: string;
  status: FrotaInternaStatus;
  combustivel: "Diesel" | "Gasolina" | "Flex" | "Elétrico";
  observacao?: string;
}

export const frotaInterna: VeiculoInterno[] = [
  {
    id: "fi-1",
    placa: "RKZ-4A21",
    modelo: "Toyota Hilux SRX 4x4",
    ano: 2024,
    tipo: "Diretoria",
    setor: "Direção / Engenharia",
    motorista: "Eng. Ricardo Moraes",
    motoristaCargo: "Gestor de Frota",
    km: 18420,
    ultimaManutencao: "18 Mar 2026",
    proximaManutencao: "18 Set 2026",
    proximaRevisaoKm: 25000,
    vencimentoIPVA: "15 Mai 2026",
    vencimentoSeguro: "02 Jul 2026",
    status: "ativo",
    combustivel: "Diesel",
  },
  {
    id: "fi-2",
    placa: "MKF-2C09",
    modelo: "Fiat Toro Volcano",
    ano: 2023,
    tipo: "Administrativo",
    setor: "Comercial / Licitações",
    motorista: "Carla Bittencourt",
    motoristaCargo: "Coord. Comercial",
    km: 42180,
    ultimaManutencao: "02 Fev 2026",
    proximaManutencao: "02 Ago 2026",
    proximaRevisaoKm: 50000,
    vencimentoIPVA: "20 Abr 2026",
    vencimentoSeguro: "12 Jun 2026",
    status: "ativo",
    combustivel: "Diesel",
  },
  {
    id: "fi-3",
    placa: "BVT-7G54",
    modelo: "Volkswagen Saveiro CD",
    ano: 2022,
    tipo: "Operacional",
    setor: "Apoio Obras",
    motorista: "Diego Almeida",
    motoristaCargo: "Encarregado de Obra",
    km: 78420,
    ultimaManutencao: "12 Mai 2026",
    proximaManutencao: "12 Jul 2026",
    proximaRevisaoKm: 85000,
    vencimentoIPVA: "10 Mar 2026",
    vencimentoSeguro: "30 Set 2026",
    status: "ativo",
    combustivel: "Flex",
  },
  {
    id: "fi-4",
    placa: "QPL-1J88",
    modelo: "Mercedes Sprinter 415",
    ano: 2021,
    tipo: "Carga",
    setor: "Logística",
    motorista: "Wellington Souza",
    motoristaCargo: "Motorista Categoria D",
    km: 124800,
    ultimaManutencao: "28 Mai 2026",
    proximaManutencao: "HOJE",
    proximaRevisaoKm: 130000,
    vencimentoIPVA: "08 Fev 2026",
    vencimentoSeguro: "18 Ago 2026",
    status: "manutencao",
    combustivel: "Diesel",
    observacao: "Revisão de embreagem e suspensão traseira",
  },
  {
    id: "fi-5",
    placa: "TXR-3F70",
    modelo: "Renault Kwid Zen",
    ano: 2024,
    tipo: "Administrativo",
    setor: "RH / Equipe",
    motorista: "Patrícia Lemos",
    motoristaCargo: "Analista de RH",
    km: 9120,
    ultimaManutencao: "05 Jan 2026",
    proximaManutencao: "05 Jan 2027",
    proximaRevisaoKm: 20000,
    vencimentoIPVA: "25 Jun 2026",
    vencimentoSeguro: "14 Nov 2026",
    status: "ativo",
    combustivel: "Flex",
  },
  {
    id: "fi-6",
    placa: "ZNB-5D32",
    modelo: "Iveco Daily 70C17",
    ano: 2020,
    tipo: "Carga",
    setor: "Almoxarifado",
    motorista: "—",
    motoristaCargo: "Não alocado",
    km: 168450,
    ultimaManutencao: "22 Abr 2026",
    proximaManutencao: "22 Out 2026",
    proximaRevisaoKm: 175000,
    vencimentoIPVA: "12 Jan 2026",
    vencimentoSeguro: "20 Jul 2026",
    status: "parado",
    combustivel: "Diesel",
    observacao: "Aguardando alocação de motorista categoria D",
  },
  {
    id: "fi-7",
    placa: "HYG-9B17",
    modelo: "Chevrolet S10 LTZ",
    ano: 2023,
    tipo: "Apoio",
    setor: "Manutenção / Oficina",
    motorista: "Antônio Pereira",
    motoristaCargo: "Mecânico Líder",
    km: 54300,
    ultimaManutencao: "10 Jun 2026",
    proximaManutencao: "10 Dez 2026",
    proximaRevisaoKm: 60000,
    vencimentoIPVA: "30 Mar 2026",
    vencimentoSeguro: "05 Out 2026",
    status: "ativo",
    combustivel: "Diesel",
  },
  {
    id: "fi-8",
    placa: "LPS-6H45",
    modelo: "BYD Dolphin Plus",
    ano: 2025,
    tipo: "Diretoria",
    setor: "Financeiro",
    motorista: "Sra. Helena Vieira",
    motoristaCargo: "Diretora Financeira",
    km: 3200,
    ultimaManutencao: "—",
    proximaManutencao: "01 Dez 2026",
    proximaRevisaoKm: 10000,
    vencimentoIPVA: "Isento 2026",
    vencimentoSeguro: "22 Dez 2026",
    status: "ativo",
    combustivel: "Elétrico",
  },
];
