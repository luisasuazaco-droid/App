import React from 'react';
import { StudentProfile } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { BADGES, AVATAR_OPTIONS, DBA_STANDARDS } from '../data/curriculum';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish } from '../utils/audio';
import { 
  Award, 
  Star, 
  CheckCircle2, 
  Lock, 
  Compass, 
  Printer, 
  RotateCcw, 
  User, 
  Volume2, 
  BookMarked,
  Sparkles,
  Trophy,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProgressSectionProps {
  profile: StudentProfile;
  onOpenEditProfile: () => void;
  onResetProgress: () => void;
  showSpanishHelp: boolean;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  profile,
  onOpenEditProfile,
  onResetProgress,
  showSpanishHelp
}) => {
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];
  const masteredCount = profile.masteredWords.length;
  const totalOccupations = OCCUPATIONS.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalOccupations) * 100));

  // Determine unlocked badges based on activity completions
  const isBadgeUnlocked = (badgeId: string) => {
    if (badgeId === 'listening_star') {
      return profile.completedActivities.some(a => a.startsWith('listening'));
    }
    if (badgeId === 'speaking_hero') {
      return profile.completedActivities.some(a => a.startsWith('speaking'));
    }
    if (badgeId === 'reading_detective') {
      return profile.completedActivities.some(a => a.startsWith('reading'));
    }
    if (badgeId === 'writing_master') {
      return profile.completedActivities.some(a => a.startsWith('writing'));
    }
    if (badgeId === 'colombian_champion') {
      return profile.missionCompleted || profile.completedActivities.includes('grand_mission');
    }
    return false;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Profile Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-sm">
              {currentAvatar.emoji}
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1">
                <span>{profile.grade === '4th' ? 'Grado 4° de Primaria' : 'Grado 5° de Primaria'}</span>
                <span>·</span>
                <span>{currentAvatar.region}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {profile.nickname || 'Explorador'}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {currentAvatar.name}: {currentAvatar.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-300">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <div>
                <span className="text-xs text-amber-800 font-bold block leading-none">Estrellas</span>
                <span className="text-xl font-black text-amber-900 tabular-nums">{profile.stars}</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenEditProfile();
              }}
              className="py-2.5 px-4 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              Cambiar Avatar / Grado
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Dominio de Vocabulario (Vocabulary Mastery):</span>
            <span className="text-amber-700">{masteredCount} de {totalOccupations} palabras ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Insignias y Medallas de Habilidad (Skill Badges)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Gana insignias completando actividades de cada habilidad comunicativa del inglés.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const unlocked = isBadgeUnlocked(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                  unlocked
                    ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-xs ${
                    unlocked
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {unlocked ? <Award className="w-7 h-7" /> : <Lock className="w-6 h-6" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {badge.nameEs}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${unlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                      {unlocked ? 'Desbloqueada' : 'Por desbloquear'}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-amber-700 block">
                    {badge.nameEn}
                  </span>
                  <p className="text-xs text-slate-600 mt-1">
                    {showSpanishHelp ? badge.descriptionEs : badge.descriptionEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vocabulary Mastery Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Checklist de las 21 Profesiones (Vocabulario)
            </h2>
            <p className="text-xs text-slate-500">
              Toca el altavoz para escuchar cada palabra y repasar antes de evaluaciones escolares.
            </p>
          </div>
          <span className="text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            {masteredCount} / {totalOccupations} Dominadas
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 pt-2">
          {OCCUPATIONS.map((job) => {
            const isMastered = profile.masteredWords.includes(job.id);

            return (
              <div
                key={job.id}
                className={`p-3 rounded-2xl border transition flex flex-col items-center justify-between text-center gap-1.5 ${
                  isMastered
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl ${job.accentBg} flex items-center justify-center text-lg`}
                  style={{ color: job.color }}
                >
                  <JobIcon name={job.svgIconKey} className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <div className="text-xs font-extrabold text-slate-900 truncate">
                    {job.nameEn}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {job.nameEs}
                  </div>
                </div>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    speakEnglish(job.nameEn, 0.85);
                  }}
                  className="w-full py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 text-[10px] font-bold flex items-center justify-center gap-1 transition"
                >
                  <Volume2 className="w-3 h-3 text-amber-600" />
                  Oír
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate & Print Section */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0">
            <Trophy className="w-8 h-8 text-amber-100" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Certificado de Explorador de Colombia
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Imprime o guarda tu certificado de inglés de Grado {profile.grade === '4th' ? '4°' : '5°'} para mostrar a tu profesor(a) o padres.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundEffects.playStarChime();
            try { confetti({ particleCount: 50, spread: 60 }); } catch {}
            window.print();
          }}
          className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2 shrink-0"
        >
          <Printer className="w-4 h-4" />
          Imprimir Certificado
        </button>
      </div>

      {/* Danger / Reset Progress Option */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={() => {
            if (confirm('¿Deseas reiniciar tu progreso y estrellas?')) {
              onResetProgress();
            }
          }}
          className="text-xs text-slate-400 hover:text-rose-600 underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          Reiniciar progreso de esta sesión
        </button>
      </div>
    </div>
  );
};
