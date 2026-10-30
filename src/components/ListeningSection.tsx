import React, { useState, useEffect } from 'react';
import { Occupation } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish } from '../utils/audio';
import { 
  Headphones, 
  Volume2, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Star, 
  ArrowRight,
  HelpCircle,
  Shuffle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ListeningSectionProps {
  onEarnStars: (count: number) => void;
  onActivityComplete: (activityId: string) => void;
  showSpanishHelp: boolean;
}

type ListeningGameMode = 'choose' | 'who_am_i' | 'match';

export const ListeningSection: React.FC<ListeningSectionProps> = ({
  onEarnStars,
  onActivityComplete,
  showSpanishHelp
}) => {
  const [gameMode, setGameMode] = useState<ListeningGameMode>('choose');
  const [speed, setSpeed] = useState<number>(0.85);

  // --- Mode 1: Listen and Choose State ---
  const [chooseRound, setChooseRound] = useState(0);
  const [chooseTarget, setChooseTarget] = useState<Occupation>(OCCUPATIONS[0]);
  const [chooseOptions, setChooseOptions] = useState<Occupation[]>([]);
  const [chooseSelected, setChooseSelected] = useState<string | null>(null);
  const [chooseFeedback, setChooseFeedback] = useState<'correct' | 'wrong' | null>(null);

  // --- Mode 2: Who Am I State ---
  const [riddleRound, setRiddleRound] = useState(0);
  const [riddleTarget, setRiddleTarget] = useState<Occupation>(OCCUPATIONS[1]);
  const [riddleOptions, setRiddleOptions] = useState<Occupation[]>([]);
  const [riddleSelected, setRiddleSelected] = useState<string | null>(null);
  const [riddleFeedback, setRiddleFeedback] = useState<'correct' | 'wrong' | null>(null);

  // --- Mode 3: Listen and Match State ---
  const [matchPairs, setMatchPairs] = useState<Occupation[]>([]);
  const [activeAudioJob, setActiveAudioJob] = useState<string | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<string[]>([]);
  const [matchError, setMatchError] = useState<string | null>(null);

  // Setup Listen and Choose round
  const setupChooseRound = (roundIndex = 0) => {
    const target = OCCUPATIONS[roundIndex % OCCUPATIONS.length];
    const others = OCCUPATIONS.filter(o => o.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [target, ...others].sort(() => Math.random() - 0.5);

    setChooseTarget(target);
    setChooseOptions(options);
    setChooseSelected(null);
    setChooseFeedback(null);

    // Auto-play pronunciation
    setTimeout(() => {
      speakEnglish(target.nameEn, speed);
    }, 400);
  };

  // Setup Who Am I round
  const setupRiddleRound = (roundIndex = 0) => {
    // Pick from a nice diverse set of occupations with rich clues
    const riddlePool = OCCUPATIONS.filter(o => o.clueEn.length > 0);
    const target = riddlePool[roundIndex % riddlePool.length];
    const others = riddlePool.filter(o => o.id !== target.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [target, ...others].sort(() => Math.random() - 0.5);

    setRiddleTarget(target);
    setRiddleOptions(options);
    setRiddleSelected(null);
    setRiddleFeedback(null);

    // Auto-play clue
    setTimeout(() => {
      speakEnglish(target.clueEn, speed);
    }, 400);
  };

  // Setup Listen and Match round
  const setupMatchRound = () => {
    const selected = [...OCCUPATIONS].sort(() => Math.random() - 0.5).slice(0, 4);
    setMatchPairs(selected);
    setActiveAudioJob(null);
    setMatchedJobs([]);
    setMatchError(null);
  };

  useEffect(() => {
    if (gameMode === 'choose') {
      setupChooseRound(chooseRound);
    } else if (gameMode === 'who_am_i') {
      setupRiddleRound(riddleRound);
    } else if (gameMode === 'match') {
      setupMatchRound();
    }
  }, [gameMode]);

  // Handle Listen and Choose selection
  const handleChooseAnswer = (job: Occupation) => {
    if (chooseFeedback) return;
    setChooseSelected(job.id);

    if (job.id === chooseTarget.id) {
      soundEffects.playSuccess();
      setChooseFeedback('correct');
      onEarnStars(3);
      if (chooseRound >= 4) {
        onActivityComplete('listening_choose');
        try { confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } }); } catch {}
      }
    } else {
      soundEffects.playGentleTryAgain();
      setChooseFeedback('wrong');
    }
  };

  // Handle Who Am I selection
  const handleRiddleAnswer = (job: Occupation) => {
    if (riddleFeedback) return;
    setRiddleSelected(job.id);

    if (job.id === riddleTarget.id) {
      soundEffects.playSuccess();
      setRiddleFeedback('correct');
      onEarnStars(4);
      if (riddleRound >= 4) {
        onActivityComplete('listening_who_am_i');
        try { confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } }); } catch {}
      }
    } else {
      soundEffects.playGentleTryAgain();
      setRiddleFeedback('wrong');
    }
  };

  // Handle Match card pairing
  const handleCardMatchClick = (jobId: string) => {
    if (!activeAudioJob) return;
    if (matchedJobs.includes(jobId)) return;

    if (activeAudioJob === jobId) {
      soundEffects.playSuccess();
      const updated = [...matchedJobs, jobId];
      setMatchedJobs(updated);
      setActiveAudioJob(null);
      setMatchError(null);
      onEarnStars(2);

      if (updated.length === matchPairs.length) {
        onEarnStars(5);
        onActivityComplete('listening_match');
        try { confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } }); } catch {}
      }
    } else {
      soundEffects.playGentleTryAgain();
      setMatchError(jobId);
      setTimeout(() => setMatchError(null), 1000);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-3xl p-6 border-2 border-purple-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Headphones className="w-3.5 h-3.5" />
              Sección B · Listening Games (Comprensión Auditiva)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Juegos de Escucha en Inglés
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {showSpanishHelp
                ? 'Escucha con atención la pronunciación y pistas para reconocer las profesiones en inglés.'
                : 'Listen carefully to English pronunciations and clues to identify the correct occupations.'}
            </p>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start md:self-auto">
            <span className="text-[11px] font-bold text-slate-500 pl-2">Velocidad:</span>
            <button
              onClick={() => setSpeed(0.7)}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition ${
                speed === 0.7 ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              0.7x Lenta
            </button>
            <button
              onClick={() => setSpeed(0.85)}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition ${
                speed === 0.85 ? 'bg-purple-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              0.85x Normal
            </button>
          </div>
        </div>

        {/* 3 Game Sub-Tabs */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => {
              soundEffects.playPop();
              setGameMode('choose');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              gameMode === 'choose'
                ? 'bg-purple-500 text-white border-purple-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>1. Listen &amp; Choose</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setGameMode('who_am_i');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              gameMode === 'who_am_i'
                ? 'bg-purple-500 text-white border-purple-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>2. Who Am I? (Adivinanza)</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setGameMode('match');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              gameMode === 'match'
                ? 'bg-purple-500 text-white border-purple-500 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>3. Listen &amp; Match</span>
          </button>
        </div>
      </div>

      {/* MODE 1: Listen and Choose */}
      {gameMode === 'choose' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm space-y-6">
          <div className="text-center max-w-md mx-auto">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Ronda {chooseRound + 1} de 5
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Escucha y selecciona la imagen correcta
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Haz clic en el altavoz gigante para escuchar la palabra nuevamente.
            </p>

            {/* Giant Speaker Button */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  speakEnglish(chooseTarget.nameEn, speed);
                }}
                className="w-24 h-24 rounded-full bg-purple-500 hover:bg-purple-600 active:scale-95 text-white flex flex-col items-center justify-center shadow-lg shadow-purple-500/25 transition group"
              >
                <Volume2 className="w-10 h-10 group-hover:scale-110 transition" />
                <span className="text-[10px] font-bold mt-1">Repetir</span>
              </button>
            </div>
          </div>

          {/* 4 Choices Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            {chooseOptions.map((job) => {
              const isSelected = chooseSelected === job.id;
              const isTarget = job.id === chooseTarget.id;
              let borderClass = 'border-slate-200 hover:border-purple-300';

              if (chooseFeedback && isSelected) {
                borderClass = chooseFeedback === 'correct' ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200' : 'border-rose-400 bg-rose-50 ring-2 ring-rose-200';
              } else if (chooseFeedback === 'wrong' && isTarget) {
                borderClass = 'border-emerald-500 bg-emerald-50';
              }

              return (
                <button
                  key={job.id}
                  disabled={!!chooseFeedback}
                  onClick={() => handleChooseAnswer(job)}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border-2 text-center transition flex flex-col items-center justify-between gap-3 shadow-xs hover:shadow-md ${borderClass}`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${job.accentBg} flex items-center justify-center text-3xl`}
                    style={{ color: job.color }}
                  >
                    <JobIcon name={job.svgIconKey} className="w-9 h-9" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 block">
                      {job.nameEn}
                    </span>
                    {showSpanishHelp && (
                      <span className="text-xs text-slate-500 font-medium">
                        {job.nameEs}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {chooseFeedback && (
            <div className="pt-4 max-w-md mx-auto text-center flex flex-col items-center gap-3">
              {chooseFeedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ¡Excelente! Well done! (+3★)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                  <XCircle className="w-5 h-5" />
                  ¡Casi! Era &ldquo;{chooseTarget.nameEn}&rdquo;. ¡Sigue intentando!
                </div>
              )}

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setChooseRound(prev => prev + 1);
                  setupChooseRound(chooseRound + 1);
                }}
                className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                Siguiente Ronda (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: Who Am I? */}
      {gameMode === 'who_am_i' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Adivinanza Auditiva #{riddleRound + 1}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Who Am I? · ¿Quién soy?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Escucha la pista sobre el lugar y lo que hace este trabajador:
            </p>

            {/* Audio Riddle Play Button & Transcript */}
            <div className="mt-4 p-5 rounded-3xl bg-purple-50 border border-purple-200 flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  speakEnglish(riddleTarget.clueEn, speed);
                }}
                className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                <Volume2 className="w-5 h-5 text-purple-200" />
                Escuchar Pista en Inglés (Listen)
              </button>

              <p className="text-base sm:text-lg font-bold text-slate-900 italic max-w-lg">
                &ldquo;{riddleTarget.clueEn}&rdquo;
              </p>
              {showSpanishHelp && (
                <p className="text-xs text-slate-600">
                  ({riddleTarget.clueEs})
                </p>
              )}
            </div>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            {riddleOptions.map((job) => {
              const isSelected = riddleSelected === job.id;
              const isTarget = job.id === riddleTarget.id;
              let borderClass = 'border-slate-200 hover:border-purple-300';

              if (riddleFeedback && isSelected) {
                borderClass = riddleFeedback === 'correct' ? 'border-emerald-500 bg-emerald-50 ring-4 ring-emerald-200' : 'border-rose-400 bg-rose-50 ring-2 ring-rose-200';
              } else if (riddleFeedback === 'wrong' && isTarget) {
                borderClass = 'border-emerald-500 bg-emerald-50';
              }

              return (
                <button
                  key={job.id}
                  disabled={!!riddleFeedback}
                  onClick={() => handleRiddleAnswer(job)}
                  className={`bg-white rounded-3xl p-4 sm:p-5 border-2 text-center transition flex flex-col items-center justify-between gap-3 shadow-xs hover:shadow-md ${borderClass}`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${job.accentBg} flex items-center justify-center text-3xl`}
                    style={{ color: job.color }}
                  >
                    <JobIcon name={job.svgIconKey} className="w-9 h-9" />
                  </div>
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 block">
                      {job.nameEn}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {job.nameEs}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {riddleFeedback && (
            <div className="pt-4 max-w-md mx-auto text-center flex flex-col items-center gap-3">
              {riddleFeedback === 'correct' ? (
                <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ¡Acertaste! You are smart! (+4★)
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                  <XCircle className="w-5 h-5" />
                  La respuesta correcta era &ldquo;{riddleTarget.nameEn}&rdquo;.
                </div>
              )}

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setRiddleRound(prev => prev + 1);
                  setupRiddleRound(riddleRound + 1);
                }}
                className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
              >
                Siguiente Adivinanza (Next)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: Listen and Match */}
      {gameMode === 'match' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm space-y-6">
          <div className="text-center max-w-md mx-auto">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Asociación Auditiva
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Listen &amp; Match
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              1. Toca un botón de audio a la izquierda. 2. Luego selecciona su tarjeta correspondiente a la derecha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-2">
            {/* Left: Audio Buttons */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Audios (Toca para escuchar)
              </h3>
              {matchPairs.map((job, idx) => {
                const isMatched = matchedJobs.includes(job.id);
                const isSelected = activeAudioJob === job.id;

                return (
                  <button
                    key={job.id}
                    disabled={isMatched}
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveAudioJob(job.id);
                      speakEnglish(job.nameEn, speed);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-between transition ${
                      isMatched
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 opacity-60'
                        : isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-4 ring-purple-200'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-purple-100 text-purple-700'}`}>
                        <Volume2 className="w-4 h-4" />
                      </div>
                      <span>Sonido {idx + 1}</span>
                    </div>
                    {isMatched ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <span className="text-xs font-medium opacity-80">
                        {isSelected ? 'Seleccionado' : 'Reproducir'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Job Cards to Match */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Tarjetas de Profesión
              </h3>
              {[...matchPairs].sort((a, b) => a.nameEn.localeCompare(b.nameEn)).map((job) => {
                const isMatched = matchedJobs.includes(job.id);
                const hasError = matchError === job.id;

                return (
                  <button
                    key={job.id}
                    disabled={isMatched || !activeAudioJob}
                    onClick={() => handleCardMatchClick(job.id)}
                    className={`w-full p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition ${
                      isMatched
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 opacity-60'
                        : hasError
                        ? 'bg-rose-50 text-rose-800 border-rose-400 ring-2 ring-rose-200'
                        : activeAudioJob
                        ? 'bg-white text-slate-800 border-slate-300 hover:border-purple-500 hover:scale-[1.02]'
                        : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${job.accentBg} flex items-center justify-center text-xl`}
                        style={{ color: job.color }}
                      >
                        <JobIcon name={job.svgIconKey} className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900">{job.nameEn}</div>
                        <div className="text-xs text-slate-500">{job.nameEs}</div>
                      </div>
                    </div>
                    {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset / New Match round */}
          <div className="pt-4 text-center">
            {matchedJobs.length === matchPairs.length && matchPairs.length > 0 ? (
              <div className="flex flex-col items-center gap-3">
                <div className="text-emerald-700 font-extrabold text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ¡Completaste todas las parejas! (+5★)
                </div>
                <button
                  onClick={setupMatchRound}
                  className="py-3 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Jugar con Nuevas Palabras
                </button>
              </div>
            ) : (
              <button
                onClick={setupMatchRound}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline flex items-center justify-center gap-1 mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar ronda de parejas
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
