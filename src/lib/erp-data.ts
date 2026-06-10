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
