import { StudentProfile } from '../types';

const STORAGE_KEY = 'job_explorers_colombia_v1';

export const DEFAULT_PROFILE: StudentProfile = {
  nickname: '',
  grade: '4th',
  avatarId: 'camilo',
  stars: 10, // Starting encouragement stars
  completedActivities: [],
  masteredWords: [],
  badges: [],
  missionCompleted: false
};

export function loadStudentProfile(): StudentProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
}

export function resetStudentProfile(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
