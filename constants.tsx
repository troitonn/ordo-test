import React from 'react';
import { ShieldCheck, Database, LayoutPanelLeft, LineChart } from 'lucide-react';
import { ServiceBlock, Person, FaqItem } from './types';

export const SERVICES: ServiceBlock[] = [
  {
    title: "1️⃣ Diagnóstico & Viabilidade",
    icon: <LineChart className="w-6 h-6 text-emerald-500" />,
    items: [
      "Análise do modelo de negócio",
      "Estrutura societária",
      "Mapeamento regulatório",
      "Avaliação de riscos"
    ]
  },
  {
    title: "2️⃣ Estruturação Operacional",
    icon: <LayoutPanelLeft className="w-6 h-6 text-emerald-500" />,
    items: [
      "Definição do modelo BaaS",
      "Clareza de papéis regulatórios",
      "Desenho do fluxo de produtos tecnológicos",
      "Arquitetura operacional"
    ]
  },
  {
    title: "3️⃣ Documentação & Políticas",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    items: [
      "Organização completa de documentação",
      "Dataroom estratégico",
      "Políticas necessárias para aprovação",
      "Ajuste da comunicação institucional"
    ]
  },
  {
    title: "4️⃣ Interface com Mercado",
    icon: <Database className="w-6 h-6 text-emerald-500" />,
    items: [
      "Indicação de liquidantes",
      "Apoio em reuniões",
      "Negociação estratégica",
      "Acompanhamento até liberação de credenciais"
    ]
  }
];

export const MENTORS: Person[] = [
  {
    name: "Fernando Candido",
    role: "Presidente Pagare Instituição de Pagamento",
    description: "Referência no mercado de Instituições de Pagamento, acompanha de perto nossa jornada e contribui com visão estratégica profunda sobre estrutura regulatória e fluxos operacionais complexos.",
    image: "https://picsum.photos/seed/fernando/400/400"
  },
  {
    name: "Luis Henrique Archanjo",
    role: "Ex-Fundador Cronos Bank",
    description: "Empreendedor que foi ponto de virada na trajetória das fundadoras, proporcionando experiência prática em mais de 120 projetos no ecossistema fintech.",
    image: "https://picsum.photos/seed/luis/400/400"
  },
  {
    name: "Henrique Costa",
    role: "CTO & Fundador da Evostack",
    description: "Estrategista em inovação e parceiro de longa data na construção de ecossistemas digitais. Nossa colaboração contínua une programação de alta performance, UX e IA aplicada para criar fintechs de alta eficiência.",
    image: "https://picsum.photos/seed/henrique/400/400"
  }
];

export const FOUNDERS: Person[] = [
  {
    name: "Letícia Fita",
    role: "Fundadora & Estrategista",
    description: "Com mais de 6 anos de atuação e participação em mais de 200 projetos BaaS. Especialista em desenho estratégico e interface com parceiros de mercado. Na Ordo, encontrou um propósito maior: construir estruturas sólidas antes da escala.",
    image: "https://picsum.photos/seed/leticia/400/400"
  },
  {
    name: "Lívia Fita",
    role: "Co-Fundadora & Executiva Operacional",
    description: "Com mais de 5 anos de experiência no setor, atua na organização, execução e acompanhamento estratégico dos projetos. Reconhecida pela capacidade de transformar ideias em estruturas viáveis.",
    image: "https://picsum.photos/seed/livia/400/400"
  }
];

export const FAQ: FaqItem[] = [
  {
    question: "A Ordo é banco?",
    answer: "Não. Somos assessoria estratégica especializada na estruturação de fintechs. Não somos instituição financeira e não oferece serviços financeiros ao público."
  },
  {
    question: "Vocês garantem aprovação junto a parceiros?",
    answer: "Não garantimos aprovações. Estruturamos o projeto dentro das melhores práticas exigidas pelo mercado para maximizar as chances de sucesso."
  },
  {
    question: "O que é necessário para estruturar uma fintech no Brasil?",
    answer: "Envolve modelo operacional, definição de arranjo (IP, correspondente ou BaaS), organização societária, políticas obrigatórias e interface com parceiros licenciados."
  },
  {
    question: "É preciso ter licença do Banco Central para abrir uma fintech?",
    answer: "Depende do modelo. Muitas fintechs operam por meio de parcerias com instituições licenciadas."
  },
  {
    question: "Quanto custa estruturar uma fintech?",
    answer: "Depende da complexidade do modelo, produtos e nível de governança exigido pelos parceiros."
  },
  {
    question: "Quanto tempo leva para estruturar uma fintech?",
    answer: "Projetos estruturados podem levar de algumas semanas a alguns meses, dependendo da maturidade e documentação do projeto."
  },
  {
    question: "Posso abrir fintech sendo LTDA?",
    answer: "Sim, dependendo do modelo operacional adotado."
  },
  {
    question: "Qual a diferença entre fintech, IP e BaaS?",
    answer: "Fintech é o modelo de negócio. IP é a instituição regulada. BaaS é a estrutura operacional baseada em parceria."
  }
];