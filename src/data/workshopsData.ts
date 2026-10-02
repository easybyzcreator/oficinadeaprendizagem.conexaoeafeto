import { Workshop, Differential, WeekCycle, Specialist } from '../types';

export const UNIFIED_WORKSHOP = {
  name: 'Oficina Ler, Escrever e Contar...',
  badge: 'Turma Aberta • 4 Encontros Semanais aos Sábados',
  schedule: 'Aos sábados • 4 encontros semanais • Vagas reduzidas',
  description:
    'Um programa completo e integrado que une psicomotricidade fina, alfabetização clínica e raciocínio lógico-matemático, conduzido simultaneamente por nossas duas especialistas em um ambiente lúdico e afetuoso.',
  modules: [
    {
      id: 'coordenacao',
      tag: 'ENVOLVE',
      title: 'Coordenação Motora e Grafomotricidade',
      description:
        'Desenvolvimento das habilidades necessárias para a escrita, desenho e coordenação motora fina.',
      skills: [
        'Coordenação motora fina',
        'Organização',
        'Pré-escrita e grafomotricidade',
      ],
      tagColor: '#68C9EA',
      bgColor: '#F0F9FD',
      borderColor: '#68C9EA',
      textColor: '#1F6785',
      iconName: 'PencilRuler',
    },
    {
      id: 'alfabetizacao',
      tag: 'ALÉM DE',
      title: 'Alfabetização Clínica',
      description:
        'Vivências que fortalecem o processo de leitura e escrita de forma significativa e prazerosa.',
      skills: [
        'Leitura e escrita',
        'Compreensão textual',
        'Vocabulário',
      ],
      tagColor: '#FA4E74',
      bgColor: '#FFF1F4',
      borderColor: '#FA4E74',
      textColor: '#9E1C38',
      iconName: 'BookOpenCheck',
    },
    {
      id: 'matematica',
      tag: 'E TAMBÉM',
      title: 'Raciocínio Lógico Matemático',
      description:
        'Experiências concretas e lúdicas para construir o pensamento matemático.',
      skills: [
        'Operações básicas',
        'Resolução de problemas',
        'Atenção e memória',
      ],
      tagColor: '#F9DC3F',
      bgColor: '#FEFDF0',
      borderColor: '#D4AF37',
      textColor: '#856A00',
      iconName: 'Calculator',
    },
  ],
};

export const WORKSHOPS: Workshop[] = [
  {
    id: 'ler-escrever-contar',
    name: 'Oficina Ler, Escrever e Contar...',
    subtitle: 'Coordenação Motora, Alfabetização Clínica e Raciocínio Lógico',
    description:
      'Programa integrado de desenvolvimento infantil envolvendo coordenação motora fina e pré-escrita, além de alfabetização clínica e raciocínio lógico-matemático.',
    skills: [
      'Coordenação motora fina',
      'Organização',
      'Pré-escrita e grafomotricidade',
      'Leitura e escrita',
      'Compreensão textual',
      'Vocabulário',
      'Operações básicas',
      'Resolução de problemas',
      'Atenção e memória',
    ],
    tagColor: '#FA4E74',
    bgColor: '#FFF1F4',
    borderColor: '#FA4E74',
    textColor: '#9E1C38',
    iconName: 'BookOpenCheck',
    ageRecommendation: 'Aos sábados • 4 encontros',
  },
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: 'atendimento',
    title: 'Atendimento compartilhado',
    description: 'A oficina é conduzida simultaneamente por duas profissionais, garantindo um olhar integrado para o desenvolvimento infantil.',
    iconName: 'Users',
    color: '#FA4E74',
  },
  {
    id: 'significado',
    title: 'Aprendizagem com significado',
    description: 'Atividades planejadas para fortalecer habilidades cognitivas, psicomotoras e emocionais de forma prazerosa.',
    iconName: 'Sparkles',
    color: '#68C9EA',
  },
  {
    id: 'afeto',
    title: 'Metodologia afetiva',
    description: 'Acreditamos que o vínculo, a segurança emocional e o acolhimento são essenciais para a aprendizagem.',
    iconName: 'HeartHandshake',
    color: '#E58B92',
  },
  {
    id: 'intervencao',
    title: 'Intervenção especializada',
    description: 'Estratégias fundamentadas na Neuropsicopedagogia, Psicopedagogia, Educação Inclusiva e Arteterapia.',
    iconName: 'GraduationCap',
    color: '#8D72A8',
  },
];

export const WEEKS_CYCLE: WeekCycle[] = [
  {
    week: 1,
    title: 'Conhecer e Conectar',
    badge: 'Semana 1',
    description: 'Acolhimento, vínculo e avaliação inicial das potencialidades e desafios.',
    color: '#68C9EA',
  },
  {
    week: 2,
    title: 'Explorar e Experimentar',
    badge: 'Semana 2',
    description: 'Vivências lúdicas e criativas focadas nos objetivos da oficina.',
    color: '#F9DC3F',
  },
  {
    week: 3,
    title: 'Desenvolver e Consolidar',
    badge: 'Semana 3',
    description: 'Desafios graduais para fortalecer a escrita, leitura e raciocínio lógico.',
    color: '#56C45F',
  },
  {
    week: 4,
    title: 'Integrar e Celebrar',
    badge: 'Semana 4',
    description: 'Socialização das conquistas e orientações para continuidade do desenvolvimento.',
    color: '#FA4E74',
  },
];

export const SPECIALISTS: Specialist[] = [
  {
    name: 'Adriana Bueno Marques',
    role: 'Neuropsicopedagoga, Arteterapeuta e Especialista em Alfabetização',
    bio: 'Com olhar sensível e criativo, integra arte, aprendizagem e desenvolvimento emocional para auxiliar crianças a superarem desafios e descobrirem suas potencialidades.',
    specialties: ['Arteterapia Clínica', 'Neuropsicopedagogia', 'Alfabetização & Letramento', 'Desenvolvimento Emocional'],
    imageKey: 'adriana',
  },
  {
    name: 'Fabrine Fernandes',
    role: 'Neuropsicopedagoga e Psicopedagoga Especialista em Educação Inclusiva',
    bio: 'Atua na construção de estratégias que favorecem o desenvolvimento cognitivo, a inclusão e a aprendizagem respeitando a singularidade de cada criança.',
    specialties: ['Educação Inclusiva', 'Neuropsicopedagogia', 'Funções Executivas', 'Psicopedagogia Clínica'],
    imageKey: 'fabrine',
  },
];

export const BRAND = {
  name: 'Oficina de Aprendizagem',
  courseName: 'Oficina de Aprendizagem',
  workshopTitle: 'Oficina Ler, Escrever e Contar...',
  subtitle: 'Neuropsicopedagógica e Arteterapêutica',
  tagline: 'Aprender com afeto, criar com propósito e desenvolver com significado.',
  heroQuote: 'Uma oficina que une alfabetização afetiva, arte e neurociência para desbloquear a leitura e a escrita de forma leve, sem pressão e sem rótulos.',
  finalCallHeading: 'Toda criança pode aprender quando encontra o caminho certo.',
  finalCallDescription: 'Descubra como nossa oficina de aprendizagem pode transformar desafios em conquistas.',
  slogan: 'Conexões que transformam. Afeto que ensina. Conhecimento que desenvolve.',
  partnership: 'Uma parceria construída pela amizade, confiança e pelo compromisso com o desenvolvimento infantil. A união entre Neuropsicopedagogia, Psicopedagogia e Arteterapia permite um trabalho acolhedor e especializado, onde cada criança é vista de forma integral.',
  duration: 'Tempo de duração: 1 hora e 30 minutos',
  format: 'Vagas reduzidas',
  meetingTime: 'Aos sábados • Tempo de duração: 1 hora e 30 minutos',
  totalValue: 'VALOR TOTAL 300,00',
  specialistsNote: 'Condução por duas especialistas simultaneamente',
};
