import React from 'react';
import { ActiveSection, StudentProfile } from '../types';
import { AVATAR_OPTIONS } from '../data/curriculum';
import { soundEffects } from '../utils/audio';
import { 
  Compass, 
  Headphones, 
  Mic, 
  BookOpen, 
  Pencil, 
  Gamepad2, 
  Award, 
  Star,
  Languages,
  BookMarked
} from 'lucide-react';

interface NavbarProps {
  currentSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  profile: StudentProfile;
  onOpenDbaModal: () => void;
  onOpenProfileModal: () => void;
  showSpanishHelp: boolean;
  onToggleSpanishHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  profile,
  onOpenDbaModal,
  onOpenProfileModal,
  showSpanishHelp,
  onToggleSpanishHelp
}) => {
  const currentAvatar = AVATAR_OPTIONS.find(a => a.id === profile.avatarId) || AVATAR_OPTIONS[0];

  const navLinks = [
    { id: 'explore' as ActiveSection, labelEn: 'Explore', labelEs: 'Explorar' },
    { id: 'listening' as ActiveSection, labelEn: 'Listening', labelEs: 'Escucha' },
    { id: 'speaking' as ActiveSection, labelEn: 'Speaking', labelEs: 'Habla' },
    { id: 'reading' as ActiveSection, labelEn: 'Reading', labelEs: 'Lectura' },
    { id: 'writing' as ActiveSection, labelEn: 'Writing', labelEs: 'Escritura' },
    { id: 'games' as ActiveSection, labelEn: 'Games', labelEs: 'Juegos' },
    { id: 'progress' as ActiveSection, labelEn: 'Progress', labelEs: 'Progreso' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top Colombian flag trim */}
      <div className="h-1 w-full flex">
        <div className="h-full bg-amber-400 w-1/2"></div>
        <div className="h-full bg-blue-600 w-1/4"></div>
        <div className="h-full bg-rose-600 w-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => {
            soundEffects.playPop();
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 text-left shrink-0 group focus-visible:outline-amber-500 rounded-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
            <Compass className="w-5 h-5 text-amber-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              Job Explorers <span className="text-amber-600">Colombia</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
              English Vocab · DBA Grado {profile.grade === '4th' ? '4°' : '5°'}
            </span>
          </div>
        </button>

        {/* Zone 2: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  soundEffects.playPop();
                  onNavigate(link.id);
                }}
                className={`px-3 py-1.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {link.labelEn}
                <span className="text-[11px] font-normal text-slate-400 block -mt-0.5">
                  {link.labelEs}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Student Capsule */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Spanish Help Toggle */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onToggleSpanishHelp();
            }}
            title="Alternar explicaciones en español para apoyo"
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              showSpanishHelp
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-200'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Languages className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Ayuda ES</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-white text-slate-700 font-bold">
              {showSpanishHelp ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* DBA Standards info button for teachers/parents */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onOpenDbaModal();
            }}
            title="Ver alineación curricular DBA Ministerio de Educación Nacional"
            className="p-2 rounded-xl text-slate-600 hover:text-amber-800 hover:bg-amber-50 border border-slate-200 text-xs font-semibold flex items-center gap-1 transition"
          >
            <BookMarked className="w-4 h-4 text-amber-600" />
            <span className="hidden xl:inline">Guía DBA</span>
          </button>

          {/* Stars Tally & Student Profile trigger */}
          <button
            onClick={() => {
              soundEffects.playPop();
              onOpenProfileModal();
            }}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition focus-visible:outline-amber-500"
          >
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-lg border border-amber-200 shadow-xs">
              {currentAvatar.emoji}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[80px] sm:max-w-[100px]">
                {profile.nickname || 'Explorador'}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span className="tabular-nums">{profile.stars}</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Horizontal Navigation Bar */}
      <div className="lg:hidden border-t border-slate-100 bg-amber-50/50 px-2 py-1.5 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
        {navLinks.map((link) => {
          const isActive = currentSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => {
                soundEffects.playPop();
                onNavigate(link.id);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap shrink-0 transition ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {link.labelEn}
            </button>
          );
        })}
      </div>
    </header>
  );
};
