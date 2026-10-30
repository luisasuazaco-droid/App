import React from 'react';
import { ActiveSection, StudentProfile } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { soundEffects, speakEnglish, speakSpanish } from '../utils/audio';
import { 
  Sparkles, 
  Volume2, 
  Compass, 
  Headphones, 
  Mic, 
  BookOpen, 
  Pencil, 
  Gamepad2, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Layers,
  BookMarked
} from 'lucide-react';

interface HomeDashboardProps {
  profile: StudentProfile;
  onNavigate: (section: ActiveSection) => void;
  onOpenDbaModal: () => void;
  showSpanishHelp: boolean;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  profile,
  onNavigate,
  onOpenDbaModal,
  showSpanishHelp
}) => {
  const masteredCount = profile.masteredWords.length;
  const totalOccupations = OCCUPATIONS.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalOccupations) * 100));

  const skillCards = [
    {
      id: 'explore' as ActiveSection,
      titleEn: '1. Explore & Learn',
      titleEs: 'Galería de Vocabulario',
      descEn: 'Discover 21 jobs, their tools, workplaces, and correct English pronunciation.',
      descEs: 'Descubre 21 profesiones, sus herramientas, lugares de trabajo y audios.',
      icon: Layers,
      color: 'bg-blue-500',
      accentBg: 'bg-blue-50',
      border: 'border-blue-200',
      stats: '21 Occupations'
    },
    {
      id: 'listening' as ActiveSection,
      titleEn: '2. Listening Games',
      titleEs: 'Juegos de Escucha',
      descEn: 'Train your ear with "Listen & Choose", "Who Am I?" riddles, and audio matching.',
      descEs: 'Entrena tu oído con adivinanzas de audio y asociación auditiva.',
      icon: Headphones,
      color: 'bg-purple-500',
      accentBg: 'bg-purple-50',
      border: 'border-purple-200',
      stats: '3 Game Modes'
    },
    {
      id: 'speaking' as ActiveSection,
      titleEn: '3. Speaking Corner',
      titleEs: 'Rincón de Pronunciación',
      descEn: 'Listen and repeat, record your own voice, and speak full sentences with confidence.',
      descEs: 'Escucha, repite, graba tu voz en el micrófono y practica oraciones.',
      icon: Mic,
      color: 'bg-rose-500',
      accentBg: 'bg-rose-50',
      border: 'border-rose-200',
      stats: 'Microphone Practice'
    },
    {
      id: 'reading' as ActiveSection,
      titleEn: '4. Reading Adventures',
      titleEs: 'Aventuras de Lectura',
      descEn: 'Match descriptions with pictures, complete sentences, and read short stories.',
      descEs: 'Lee pistas, completa oraciones y descubre quién es cada trabajador.',
      icon: BookOpen,
      color: 'bg-emerald-500',
      accentBg: 'bg-emerald-50',
      border: 'border-emerald-200',
      stats: 'Reading Comprehension'
    },
    {
      id: 'writing' as ActiveSection,
      titleEn: '5. Writing Workshop',
      titleEs: 'Taller de Escritura',
      descEn: 'Complete missing letters, unscramble words, build sentences, and write your dream job.',
      descEs: 'Completa letras, desordena palabras y crea tu diploma de profesión soñada.',
      icon: Pencil,
      color: 'bg-amber-500',
      accentBg: 'bg-amber-50',
      border: 'border-amber-200',
      stats: 'Sentence Builder'
    },
    {
      id: 'games' as ActiveSection,
      titleEn: '6. The Grand Mission',
      titleEs: 'Desafíos & Misión Colombia',
      descEn: 'Test your memory and take on the Job Explorer Mission across Colombia!',
      descEs: 'Juego de memoria y la gran misión por Colombia para ganar la medalla de oro.',
      icon: Gamepad2,
      color: 'bg-teal-500',
      accentBg: 'bg-teal-50',
      border: 'border-teal-200',
      stats: 'Mission Challenge'
    }
  ];

  const handleTitoVoice = () => {
    soundEffects.playStarChime();
    speakEnglish(
      `Hello ${profile.nickname || 'explorer'}! Welcome to Colombia Job Explorers. Are you ready to learn English? Let's discover what teachers, doctors, and farmers do!`,
      0.85
    );
  };

  const handleDailyPhraseAudio = () => {
    soundEffects.playPop();
    speakEnglish('A doctor works in a hospital and cures sick people.', 0.85);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden shadow-lg border border-amber-200 bg-amber-900">
        <div className="relative h-64 sm:h-80 md:h-96 w-full">
          <img
            src="/src/assets/images/job_explorers_hero_banner_1793372256487.jpg"
            alt="Colombian community workers and children"
            className="w-full h-full object-cover object-center brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-10 text-white">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/90 text-amber-950 text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Colegios Públicos de Colombia · DBA Grado {profile.grade === '4th' ? '4°' : '5°'}
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                ¡Hola, <span className="text-amber-400">{profile.nickname || 'Explorador'}</span>!
              </h1>
              <p className="text-sm sm:text-base text-slate-200 mt-2 font-medium">
                {showSpanishHelp 
                  ? 'Aprende y practica vocabulario de profesiones y oficios en inglés desarrollando tus 4 habilidades: Escucha, Habla, Lectura y Escritura.'
                  : 'Explore jobs and occupations in English! Practice listening, speaking, reading, and writing in a fun Colombian adventure.'}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    soundEffects.playSuccess();
                    onNavigate('explore');
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  Comenzar a Explorar (Explore)
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onNavigate('listening');
                  }}
                  className="px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md active:scale-95 text-white font-semibold text-sm transition flex items-center gap-2"
                >
                  <Headphones className="w-4 h-4 text-amber-300" />
                  Juegos de Audio (Listening)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar & Tito Mascot Callout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tito Mascot Card */}
        <div className="md:col-span-1 bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-xs flex items-center gap-4 relative overflow-hidden">
          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-sm bg-emerald-50">
            <img
              src="/src/assets/images/mascot_tito_explorer_1793372256603.jpg"
              alt="Tito el Loro Explorador"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Tito el Guía</span>
              <button
                onClick={handleTitoVoice}
                title="Escuchar a Tito hablar en inglés"
                className="p-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">¡Aprende conmigo!</h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              Haz clic en el altavoz para escuchar mi consejo de hoy.
            </p>
            <button
              onClick={handleTitoVoice}
              className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
            >
              Escuchar consejo en inglés &gt;
            </button>
          </div>
        </div>

        {/* Progress & Stars summary */}
        <div className="md:col-span-2 bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Tu Progreso Escolar</span>
              <h3 className="text-base font-extrabold text-slate-900">
                {masteredCount} de {totalOccupations} profesiones dominadas
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400 text-amber-600" />
                <span className="tabular-nums">{profile.stars}</span> Estrellas
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-blue-100 text-blue-900 font-bold text-xs">
                {profile.grade === '4th' ? 'Grado 4°' : 'Grado 5°'}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 mt-2 font-medium">
              <span>Nivel Pre-A1 / A1</span>
              <span className="font-bold text-slate-700">{progressPercent}% completado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Sentence Frame Spotlight */}
      <div className="bg-gradient-to-r from-cyan-50 via-sky-50 to-blue-50 rounded-3xl p-5 sm:p-6 border-2 border-cyan-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-cyan-600/20">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-800">
              Oración del Día · Sentence of the Day
            </div>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
              &ldquo;A doctor works in a hospital and cures sick people.&rdquo;
            </p>
            {showSpanishHelp && (
              <p className="text-xs text-slate-600 mt-0.5 italic">
                (Un médico trabaja en un hospital y cura a las personas enfermas.)
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleDailyPhraseAudio}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 active:scale-95 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 shrink-0"
        >
          <Volume2 className="w-4 h-4" />
          Escuchar Pronunciación
        </button>
      </div>

      {/* Core Activity Grid (The 6 main pathways) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Secciones Principales de Aprendizaje
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Desarrolla las 4 habilidades comunicativas del inglés según las normas del MEN.
            </p>
          </div>
          <button
            onClick={() => {
              soundEffects.playPop();
              onOpenDbaModal();
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1"
          >
            <BookMarked className="w-4 h-4" />
            Ver DBA 4°-5°
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => {
                  soundEffects.playPop();
                  onNavigate(card.id);
                }}
                className={`bg-white rounded-3xl p-6 border-2 ${card.border} hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${card.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {card.stats}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-amber-600 transition">
                    {card.titleEn}
                  </h3>
                  <span className="text-xs font-semibold text-amber-700 block -mt-0.5">
                    {card.titleEs}
                  </span>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {showSpanishHelp ? card.descEs : card.descEn}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-amber-600">
                  <span>Ingresar a la actividad</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
