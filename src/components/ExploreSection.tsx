import React, { useState } from 'react';
import { Occupation, JobCategory } from '../types';
import { OCCUPATIONS, CATEGORIES } from '../data/occupations';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish, speakSpanish } from '../utils/audio';
import { 
  Volume2, 
  Search, 
  Sparkles, 
  Check, 
  Compass, 
  Briefcase, 
  Wrench, 
  HelpCircle,
  X,
  Play,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface ExploreSectionProps {
  masteredWords: string[];
  onToggleMastered: (jobId: string) => void;
  showSpanishHelp: boolean;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  masteredWords,
  onToggleMastered,
  showSpanishHelp
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeJobModal, setActiveJobModal] = useState<Occupation | null>(null);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);

  const filteredOccupations = OCCUPATIONS.filter((job) => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = 
      job.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.nameEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.workplace.en.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlayAudio = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    soundEffects.playPop();
    speakEnglish(text, speechSpeed);
  };

  const handleOpenModal = (job: Occupation) => {
    soundEffects.playPop();
    setActiveJobModal(job);
    speakEnglish(job.nameEn, speechSpeed);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              Sección A · Explore and Learn
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Galería de Profesiones y Oficios
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {showSpanishHelp
                ? 'Toca cualquier tarjeta para escuchar su pronunciación, conocer su lugar de trabajo y herramientas.'
                : 'Click any card to listen to pronunciation, see workplaces, and discover tools!'}
            </p>
          </div>

          {/* Speech Speed & Search Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Speed toggle for Colombian EFL beginners */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
              <span className="text-[11px] font-bold text-slate-500 pl-2">Velocidad:</span>
              <button
                onClick={() => setSpeechSpeed(0.7)}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition ${
                  speechSpeed === 0.7 ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Pronunciación lenta para principiantes"
              >
                0.7x Lenta
              </button>
              <button
                onClick={() => setSpeechSpeed(0.85)}
                className={`px-2.5 py-1 text-xs font-bold rounded-xl transition ${
                  speechSpeed === 0.85 ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Velocidad normal"
              >
                0.85x Normal
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar profesión..."
                className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-amber-500 focus:ring-2 focus:ring-amber-200"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.labelEs} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {filteredOccupations.map((job) => {
          const isMastered = masteredWords.includes(job.id);
          return (
            <div
              key={job.id}
              onClick={() => handleOpenModal(job)}
              className={`bg-white rounded-3xl p-5 border-2 transition-all cursor-pointer group flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 ${
                isMastered ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              <div>
                {/* Top header row: Category label & Mastery checkbox */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {job.categoryLabelEs}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEffects.playStarChime();
                      onToggleMastered(job.id);
                    }}
                    title={isMastered ? 'Palabra dominada' : 'Marcar como dominada'}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition ${
                      isMastered
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-400 hover:bg-emerald-100 hover:text-emerald-600'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                {/* Central Icon & Name */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div
                    className={`w-14 h-14 rounded-2xl ${job.accentBg} flex items-center justify-center text-2xl shadow-xs group-hover:scale-105 transition`}
                    style={{ color: job.color }}
                  >
                    <JobIcon name={job.svgIconKey} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition">
                      {job.nameEn}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600">
                      {job.nameEs}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {job.phoneticTip}
                    </span>
                  </div>
                </div>

                {/* Workplace & Tools Pills */}
                <div className="space-y-1.5 py-2 border-y border-slate-100 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Briefcase className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-slate-500">Lugar:</span>
                    <span className="font-semibold text-slate-800 truncate">
                      {job.workplace.en} {showSpanishHelp && `(${job.workplace.es})`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Wrench className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="text-slate-500">Usa:</span>
                    <span className="font-semibold text-slate-800 truncate">
                      {job.tools[0]?.en} {showSpanishHelp && `(${job.tools[0]?.es})`}
                    </span>
                  </div>
                </div>

                {/* Example short sentence */}
                <p className="text-xs text-slate-600 mt-2.5 italic line-clamp-1">
                  &ldquo;{job.sentences[0].en}&rdquo;
                </p>
              </div>

              {/* Bottom audio action button */}
              <div className="mt-4 pt-3 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => handlePlayAudio(e, job.nameEn)}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 transition active:scale-95"
                >
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  Pronunciar
                </button>
                <button
                  onClick={() => handleOpenModal(job)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
                >
                  Detalles
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Job Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative my-8 animate-in fade-in zoom-in-95">
            {/* Close button */}
            <button
              onClick={() => setActiveJobModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 pr-10">
              <div
                className={`w-16 h-16 rounded-2xl ${activeJobModal.accentBg} flex items-center justify-center text-3xl shadow-md`}
                style={{ color: activeJobModal.color }}
              >
                <JobIcon name={activeJobModal.svgIconKey} className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  {activeJobModal.categoryLabelEs}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {activeJobModal.nameEn}
                </h2>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <span>{activeJobModal.nameEs}</span>
                  <span>·</span>
                  <span className="font-mono text-xs text-amber-700 font-bold">
                    {activeJobModal.phoneticTip}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio action bar */}
            <div className="mt-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Escuchar pronunciación:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakEnglish(activeJobModal.nameEn, 0.7)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 flex items-center gap-1 transition"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                  0.7x Lento
                </button>
                <button
                  onClick={() => speakEnglish(activeJobModal.nameEn, 0.85)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1 transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Normal
                </button>
              </div>
            </div>

            {/* Workplace & Tools Detail */}
            <div className="mt-5 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  Lugar de Trabajo · Workplace
                </div>
                <div className="text-base font-extrabold text-slate-900">
                  {activeJobModal.workplace.en}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {activeJobModal.workplace.es}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  Herramientas y Objetos · Tools
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {activeJobModal.tools.map((tool, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">{tool.en}</div>
                      <div className="text-[11px] text-slate-500">{tool.es}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Sentences */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                  Oraciones de Ejemplo · Sentences
                </div>
                <div className="space-y-2">
                  {activeJobModal.sentences.map((sent, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-2 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">&ldquo;{sent.en}&rdquo;</div>
                        <div className="text-slate-600 italic">({sent.es})</div>
                      </div>
                      <button
                        onClick={() => speakEnglish(sent.en, 0.85)}
                        className="p-1 rounded-lg bg-white hover:bg-amber-100 text-amber-700 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colombian Context Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
                  🇨🇴 En el contexto colombiano:
                </div>
                <p className="text-emerald-800 leading-relaxed">
                  {activeJobModal.colombianContext}
                </p>
              </div>
            </div>

            {/* Modal Bottom Action */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  soundEffects.playStarChime();
                  onToggleMastered(activeJobModal.id);
                }}
                className={`py-3 px-5 rounded-2xl font-bold text-xs flex items-center gap-2 transition ${
                  masteredWords.includes(activeJobModal.id)
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-100 hover:text-emerald-800'
                }`}
              >
                <Check className="w-4 h-4" />
                {masteredWords.includes(activeJobModal.id) ? '¡Palabra Dominada!' : 'Marcar como Dominada (+5★)'}
              </button>

              <button
                onClick={() => setActiveJobModal(null)}
                className="py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition"
              >
                Cerrar (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
