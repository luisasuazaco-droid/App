export type JobCategory = 'community' | 'professions' | 'rural';

export interface WorkplaceInfo {
  en: string;
  es: string;
  icon: string;
}

export interface ToolInfo {
  en: string;
  es: string;
}

export interface ExampleSentence {
  en: string;
  es: string;
}

export interface Occupation {
  id: string;
  nameEn: string;
  nameEs: string;
  category: JobCategory;
  categoryLabelEn: string;
  categoryLabelEs: string;
  pronunciation: string;
  phoneticTip: string;
  color: string;
  accentBg: string;
  textColor: string;
  workplace: WorkplaceInfo;
  tools: ToolInfo[];
  descriptionEn: string;
  descriptionEs: string;
  clueEn: string;
  clueEs: string;
  sentences: ExampleSentence[];
  colombianContext: string;
  svgIconKey: string;
}

export interface StudentProfile {
  nickname: string;
  grade: '4th' | '5th';
  avatarId: string;
  stars: number;
  completedActivities: string[];
  masteredWords: string[];
  badges: string[];
  dreamJob?: {
    jobTitle: string;
    reason: string;
    date: string;
  };
  missionCompleted: boolean;
}

export type ActiveSection = 
  | 'home' 
  | 'explore' 
  | 'listening' 
  | 'speaking' 
  | 'reading' 
  | 'writing' 
  | 'games' 
  | 'progress';
