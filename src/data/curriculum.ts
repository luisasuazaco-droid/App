export interface DbaStandard {
  grade: '4th' | '5th';
  code: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  evidence: string[];
}

export const DBA_STANDARDS: DbaStandard[] = [
  {
    grade: '4th',
    code: 'DBA 1 (Grado 4°)',
    titleEn: 'Understand Simple Oral Texts',
    titleEs: 'Comprende textos cortos y sencillos orales',
    descriptionEn: 'Understands short, simple spoken descriptions of familiar people and community workers when spoken slowly and clearly.',
    descriptionEs: 'Comprende información básica sobre profesiones y personas de su entorno en descripciones orales sencillas.',
    evidence: [
      'Identifica palabras sobre ocupaciones en audios cortos (Listening).',
      'Asocia la profesión con el lugar de trabajo y herramientas (Listen & Choose).'
    ]
  },
  {
    grade: '4th',
    code: 'DBA 3 (Grado 4°)',
    titleEn: 'Ask and Answer About Professions',
    titleEs: 'Pregunta y responde sobre ocupaciones',
    descriptionEn: 'Asks and answers basic questions about what people do using simple formulaic structures.',
    descriptionEs: 'Formula y responde preguntas básicas como "What does he do?" o "Where does she work?".',
    evidence: [
      'Pronuncia oraciones breves: "He is a firefighter", "She is a doctor" (Speaking).',
      'Participa en juegos de adivinanzas "Who am I?".'
    ]
  },
  {
    grade: '5th',
    code: 'DBA 1 (Grado 5°)',
    titleEn: 'Read and Understand Short Descriptive Texts',
    titleEs: 'Comprende textos cortos descriptivos escritos',
    descriptionEn: 'Recognizes vocabulary related to jobs and daily routines in short illustrated texts and paragraphs.',
    descriptionEs: 'Identifica información clave en lecturas cortas sobre diferentes trabajadores y sus herramientas.',
    evidence: [
      'Relaciona descripciones escritas con la imagen correspondiente (Reading Adventures).',
      'Completa oraciones con la ocupación correcta (Complete the Sentence).'
    ]
  },
  {
    grade: '5th',
    code: 'DBA 4 (Grado 5°)',
    titleEn: 'Write Simple Sentences About Occupations',
    titleEs: 'Escribe oraciones sencillas sobre oficios',
    descriptionEn: 'Writes words and organizes simple sentences describing jobs, workplaces, and personal future aspirations.',
    descriptionEs: 'Escribe palabras con ortografía adecuada y construye oraciones guiadas sobre ocupaciones.',
    evidence: [
      'Completa letras faltantes y ordena letras revueltas (Missing Letters / Unscramble).',
      'Redacta su profesión soñada: "When I grow up, I want to be a..." (Writing Workshop).'
    ]
  }
];

export interface AvatarOption {
  id: string;
  name: string;
  region: string;
  description: string;
  emoji: string;
  badgeColor: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'camilo',
    name: 'Camilo',
    region: 'Eje Cafetero',
    description: 'Alegre explorador con sombrero aguadeño',
    emoji: '🤠',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
  },
  {
    id: 'valentina',
    name: 'Valentina',
    region: 'Medellín / Antioquia',
    description: 'Curiosa científica amante de la naturaleza',
    emoji: '👧🏻',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
  },
  {
    id: 'mateo',
    name: 'Mateo',
    region: 'Costa Caribe (Barranquilla)',
    description: 'Deportista y cantante entusiasta',
    emoji: '👦🏾',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
  },
  {
    id: 'sofia',
    name: 'Sofía',
    region: 'Bogotá / Cundinamarca',
    description: 'Gran lectora y futura ingeniera',
    emoji: '👧🏽',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
  },
  {
    id: 'daniel',
    name: 'Daniel',
    region: 'Pacífico (Chocó / Cali)',
    description: 'Apasionado por la música y el arte',
    emoji: '👦🏿',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
  },
  {
    id: 'salome',
    name: 'Salomé',
    region: 'Boyacá',
    description: 'Guardián del campo y los animales',
    emoji: '👧🏼',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
  }
];

export interface BadgeInfo {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  icon: string;
  unlockedCriteria: string;
}

export const BADGES: BadgeInfo[] = [
  {
    id: 'listening_star',
    nameEn: 'Ear of Gold',
    nameEs: 'Oído de Oro',
    descriptionEn: 'Completed all Listening challenges with high accuracy.',
    descriptionEs: 'Completaste los desafíos de escucha identificando sonidos y profesiones.',
    icon: 'Headphones',
    unlockedCriteria: 'listening'
  },
  {
    id: 'speaking_hero',
    nameEn: 'Confident Speaker',
    nameEs: 'Voz Brillante',
    descriptionEn: 'Practiced speaking English words and sentences out loud.',
    descriptionEs: 'Practicaste tu pronunciación en inglés con el micrófono.',
    icon: 'Mic',
    unlockedCriteria: 'speaking'
  },
  {
    id: 'reading_detective',
    nameEn: 'Super Reader',
    nameEs: 'Detective Lector',
    descriptionEn: 'Read short descriptions and solved the reading riddles.',
    descriptionEs: 'Leíste y comprendiste las pistas sobre diferentes trabajadores.',
    icon: 'BookOpen',
    unlockedCriteria: 'reading'
  },
  {
    id: 'writing_master',
    nameEn: 'Master Writer',
    nameEs: 'Pluma Mágica',
    descriptionEn: 'Spelled English words and constructed correct sentences.',
    descriptionEs: 'Escribiste palabras y ordenaste oraciones en inglés.',
    icon: 'Pencil',
    unlockedCriteria: 'writing'
  },
  {
    id: 'colombian_champion',
    nameEn: 'Grand Explorer Medal',
    nameEs: 'Gran Medalla de Explorador',
    descriptionEn: 'Completed the multi-skill Job Explorer Mission across Colombia!',
    descriptionEs: '¡Completaste la gran misión de profesiones por Colombia!',
    icon: 'Award',
    unlockedCriteria: 'mission'
  }
];
