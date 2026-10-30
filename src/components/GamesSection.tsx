import React, { useState, useEffect } from 'react';
import { Occupation } from '../types';
import { OCCUPATIONS } from '../data/occupations';
import { JobIcon } from './JobIcon';
import { soundEffects, speakEnglish } from '../utils/audio';
import { 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GamesSectionProps {
  onEarnStars: (count: number) => void;
  onActivityComplete: (activityId: string) => void;
  onMissionFinished: () => void;
  missionCompleted: boolean;
  showSpanishHelp: boolean;
}

interface MemoryCard {
  uniqueId: string;
  jobId: string;
  type: 'image' | 'word';
  job: Occupation;
  isFlipped: boolean;
  isMatched: boolean;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  onEarnStars,
  onActivityComplete,
  onMissionFinished,
  missionCompleted,
  showSpanishHelp
}) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'memory'>('mission');

  // --- MEMORY MATCH GAME STATE ---
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);

  // Initialize Memory Game (6 pairs = 12 cards)
  const initializeMemoryGame = () => {
    soundEffects.playPop();
    const chosenJobs = [...OCCUPATIONS].sort(() => Math.random() - 0.5).slice(0, 6);
    const deck: MemoryCard[] = [];

    chosenJobs.forEach((job) => {
      deck.push({
        uniqueId: `${job.id}-img`,
        jobId: job.id,
        type: 'image',
        job,
        isFlipped: false,
        isMatched: false
      });
      deck.push({
        uniqueId: `${job.id}-word`,
        jobId: job.id,
        type: 'word',
        job,
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(deck.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedPairsCount(0);
    setMoves(0);
    setMemoryFinished(false);
  };

  useEffect(() => {
    if (activeTab === 'memory' && cards.length === 0) {
      initializeMemoryGame();
    }
  }, [activeTab]);

  const handleCardClick = (card: MemoryCard) => {
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;
    soundEffects.playPop();

    const newFlipped = [...flippedCards, card];
    const updatedCards = cards.map(c => c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c);
    setCards(updatedCards);
    setFlippedCards(newFlipped);

    // Audio hint
    speakEnglish(card.job.nameEn, 0.85);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [c1, c2] = newFlipped;
      if (c1.jobId === c2.jobId) {
        // Match!
        setTimeout(() => {
          soundEffects.playSuccess();
          const matchedCards = updatedCards.map(c => c.jobId === c1.jobId ? { ...c, isMatched: true } : c);
          setCards(matchedCards);
          setFlippedCards([]);
          const nextCount = matchedPairsCount + 1;
          setMatchedPairsCount(nextCount);
          onEarnStars(2);

          if (nextCount === 6) {
            setMemoryFinished(true);
            soundEffects.playFanfare();
            onEarnStars(10);
            onActivityComplete('game_memory');
            try { confetti({ particleCount: 70, spread: 80 }); } catch {}
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          soundEffects.playGentleTryAgain();
          setCards(prev => prev.map(c => (c.uniqueId === c1.uniqueId || c.uniqueId === c2.uniqueId) ? { ...c, isFlipped: false } : c));
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  // --- THE JOB EXPLORER MISSION STATE ---
  const [missionStage, setMissionStage] = useState(0); // 0 to 4 (4 = victory)
  const [stageAnswer, setStageAnswer] = useState<string | null>(null);
  const [stageFeedback, setStageFeedback] = useState<'correct' | 'wrong' | null>(null);

  const missionStages = [
    {
      id: 1,
      region: 'Bogotá D.C. · Capital',
      skill: 'Listening Quest',
      title: 'Misión 1: El Hospital Central',
      clue: 'Escucha con atención: "¿Quién usa una bata blanca, ausculta el corazón con estetoscopio y cura a los enfermos?"',
      audioPrompt: 'I work in a hospital. I cure sick people. Who am I?',
      options: ['Doctor', 'Chef', 'Pilot', 'Gardener'],
      correct: 'Doctor',
      reward: 5
    },
    {
      id: 2,
      region: 'Eje Cafetero (Armenia / Pereira / Manizales)',
      skill: 'Speaking Quest',
      title: 'Misión 2: Los Cafetales Andinos',
      clue: 'En las montañas verdes, Don Alfonso madruga a recolectar café en su canasto. ¿Cómo se dice campesino / agricultor en inglés?',
      audioPrompt: 'A farmer works on a farm.',
      options: ['Farmer', 'Singer', 'Driver', 'Dentist'],
      correct: 'Farmer',
      reward: 5
    },
    {
      id: 3,
      region: 'Medellín · Ciudad Innovadora',
      skill: 'Reading Quest',
      title: 'Misión 3: El Puente del Futuro',
      clue: 'Lee la frase: "Sofia designs tall buildings, roads, and bridges using computers and blueprints." ¿Cuál es su profesión?',
      audioPrompt: 'An engineer designs bridges and buildings.',
      options: ['Engineer', 'Baker', 'Fisherman', 'Nurse'],
      correct: 'Engineer',
      reward: 5
    },
    {
      id: 4,
      region: 'Cartagena de Indias · Costa Caribe',
      skill: 'Writing Quest',
      title: 'Misión 4: Sonidos y Canciones junto al Mar',
      clue: 'Completa la oración: "Shakira holds a microphone and sings beautiful music on stage. She is a ________."',
      audioPrompt: 'She is a singer.',
      options: ['Singer', 'Police officer', 'Carpenter', 'Firefighter'],
      correct: 'Singer',
      reward: 10
    }
  ];

  const currentMission = missionStages[missionStage];

  const handleMissionAnswer = (opt: string) => {
    if (stageFeedback) return;
    setStageAnswer(opt);

    if (opt === currentMission.correct) {
      soundEffects.playSuccess();
      setStageFeedback('correct');
      onEarnStars(currentMission.reward);
    } else {
      soundEffects.playGentleTryAgain();
      setStageFeedback('wrong');
    }
  };

  const advanceMission = () => {
    soundEffects.playPop();
    setStageAnswer(null);
    setStageFeedback(null);

    if (missionStage < missionStages.length - 1) {
      setMissionStage(s => s + 1);
    } else {
      // Finished all 4 stages!
      soundEffects.playFanfare();
      setMissionStage(4); // 4 = Victory screen
      onMissionFinished();
      onActivityComplete('grand_mission');
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.5 }
        });
      } catch {}
    }
  };

  const resetMission = () => {
    soundEffects.playPop();
    setMissionStage(0);
    setStageAnswer(null);
    setStageFeedback(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-teal-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              Sección F · Games &amp; Challenges (Juegos y Misiones)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Desafíos y Misión Colombia
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {showSpanishHelp
                ? 'Pon a prueba tus conocimientos en la Gran Misión de Profesiones o ejercita tu memoria con el juego de cartas.'
                : 'Take on the multi-skill Colombian explorer mission or train your visual memory with card matching!'}
            </p>
          </div>
        </div>

        {/* Sub tabs */}
        <div className="mt-5 grid grid-cols-2 gap-3 max-w-md">
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('mission');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'mission'
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Misión Colombia (Grand Mission)</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setActiveTab('memory');
            }}
            className={`p-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 border-2 ${
              activeTab === 'memory'
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Juego de Memoria (Memory Match)</span>
          </button>
        </div>
      </div>

      {/* 1. THE JOB EXPLORER MISSION */}
      {activeTab === 'mission' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-sm space-y-6 max-w-3xl mx-auto">
          {missionStage < 4 ? (
            <>
              {/* Mission Stage Stepper */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-teal-800 uppercase tracking-wider">
                  <span>Etapa {missionStage + 1} de 4</span>
                  <span>{currentMission.region}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {missionStages.map((stg, i) => (
                    <div
                      key={stg.id}
                      className={`h-2.5 rounded-full transition-all ${
                        i < missionStage
                          ? 'bg-emerald-500'
                          : i === missionStage
                          ? 'bg-teal-500 ring-2 ring-teal-200'
                          : 'bg-slate-200'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Main Mission Box */}
              <div className="p-6 rounded-3xl bg-teal-50/70 border-2 border-teal-200 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-white px-2.5 py-1 rounded-full border border-teal-200">
                      {currentMission.skill}
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 mt-2">
                      {currentMission.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => speakEnglish(currentMission.audioPrompt, 0.85)}
                    className="p-3 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white shadow-xs flex items-center gap-1.5 transition shrink-0"
                    title="Escuchar audio de la misión"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span className="text-xs font-bold hidden sm:inline">Escuchar audio</span>
                  </button>
                </div>

                <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                  {currentMission.clue}
                </p>

                <div className="p-3 rounded-2xl bg-white border border-teal-200 text-xs font-semibold text-teal-900 italic">
                  Frase en inglés: &ldquo;{currentMission.audioPrompt}&rdquo;
                </div>
              </div>

              {/* Choices */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto pt-2">
                {currentMission.options.map((opt) => {
                  const isSelected = stageAnswer === opt;
                  let btnClass = 'bg-white hover:bg-teal-50 text-slate-800 border-slate-200';

                  if (stageFeedback && isSelected) {
                    btnClass = stageFeedback === 'correct' ? 'bg-emerald-500 text-white border-emerald-500 ring-4 ring-emerald-200' : 'bg-rose-500 text-white border-rose-500';
                  } else if (stageFeedback === 'wrong' && opt === currentMission.correct) {
                    btnClass = 'bg-emerald-100 text-emerald-900 border-emerald-400';
                  }

                  return (
                    <button
                      key={opt}
                      disabled={!!stageFeedback}
                      onClick={() => handleMissionAnswer(opt)}
                      className={`p-4 rounded-2xl border-2 font-black text-base transition shadow-xs hover:scale-102 ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Proceed */}
              {stageFeedback && (
                <div className="pt-3 max-w-md mx-auto text-center flex flex-col items-center gap-3">
                  {stageFeedback === 'correct' ? (
                    <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ¡Respuesta correcta! Avanzas a la siguiente región (+{currentMission.reward}★)
                    </div>
                  ) : (
                    <div className="text-rose-600 font-bold text-xs">
                      Respuesta esperada: &ldquo;{currentMission.correct}&rdquo;. ¡Continuemos explorando!
                    </div>
                  )}

                  <button
                    onClick={advanceMission}
                    className="py-3 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                  >
                    {missionStage < 3 ? 'Avanzar a la Siguiente Región' : '¡Reclamar Gran Medalla!'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* MISSION VICTORY CARD */
            <div className="text-center py-6 space-y-6">
              <div className="w-36 h-36 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-amber-400 p-1 bg-amber-50 animate-bounce">
                <img
                  src="/src/assets/images/golden_explorer_medal_1793372256786.jpg"
                  alt="Golden Explorer Champion Medal"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-bold uppercase mb-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  ¡Misión Completada con Éxito!
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  ¡Gran Medalla de Explorador Desbloqueada!
                </h2>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto font-medium">
                  Felicitaciones. Has superado las pruebas de Escucha, Habla, Lectura y Escritura a lo largo de las regiones de Colombia. ¡Ganaste +25 Estrellas de bonificación!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetMission}
                  className="py-3 px-6 rounded-2xl border-2 border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Jugar Misión de Nuevo
                </button>
                <button
                  onClick={() => {
                    soundEffects.playStarChime();
                    try { confetti({ particleCount: 80, spread: 90 }); } catch {}
                  }}
                  className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  ¡Celebrar Victoria!
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. MEMORY MATCH */}
      {activeTab === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-200 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Memory Match · Parejas de Vocabulario
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Voltea las cartas para emparejar la imagen con el nombre en inglés.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                Movimientos: <strong className="text-slate-900">{moves}</strong>
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl">
                Parejas: <strong className="text-emerald-900">{matchedPairsCount} / 6</strong>
              </span>
              <button
                onClick={initializeMemoryGame}
                title="Reiniciar juego"
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid: 12 cards (3x4 or 4x3) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {cards.map((card) => {
              const showFront = card.isFlipped || card.isMatched;

              return (
                <button
                  key={card.uniqueId}
                  disabled={card.isMatched || card.isFlipped}
                  onClick={() => handleCardClick(card)}
                  className={`h-28 sm:h-32 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center p-2 text-center select-none ${
                    showFront
                      ? card.isMatched
                        ? 'bg-emerald-50 border-emerald-400 opacity-80'
                        : 'bg-white border-teal-400 shadow-md ring-2 ring-teal-200'
                      : 'bg-gradient-to-br from-amber-400 to-amber-500 border-amber-500 hover:scale-103 shadow-xs'
                  }`}
                >
                  {showFront ? (
                    card.type === 'image' ? (
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-12 h-12 rounded-xl ${card.job.accentBg} flex items-center justify-center text-2xl`}
                          style={{ color: card.job.color }}
                        >
                          <JobIcon name={card.job.svgIconKey} className="w-7 h-7" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          Ilustración
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-xs font-extrabold text-slate-900">
                          {card.job.nameEn}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {card.job.nameEs}
                        </span>
                        <Volume2 className="w-3.5 h-3.5 text-amber-600 mt-1" />
                      </div>
                    )
                  ) : (
                    <div className="text-white font-black text-xl flex flex-col items-center gap-1">
                      <Compass className="w-6 h-6 text-amber-100" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-100">
                        Job
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {memoryFinished && (
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                ¡Completaste el juego de memoria en {moves} movimientos! (+10★)
              </div>
              <button
                onClick={initializeMemoryGame}
                className="py-2.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition"
              >
                Jugar Otra Partida
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
